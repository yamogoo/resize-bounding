<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref, computed } from "vue";

import {
  type IStyles,
  type Options,
  type IResizeBoundingClassNames,
  PaneDirections,
  PaneDirectionAliases,
} from "../shared/typings";

import {
  paneBaseStyles,
  splitterBaseStyles,
} from "./ResizeBoundingPane.styles";

const props = withDefaults(defineProps<Props>(), {
  direction: PaneDirections.RIGHT,
});

const emits = defineEmits<{
  (e: Emits.DRAG_START, data: PaneEmittedData): void;
  (e: Emits.DRAG_MOVE, data: PaneEmittedData): void;
  (e: Emits.DRAG_END, data: PaneEmittedData): void;
  (e: Emits.FOCUS, isFocused: boolean): void;
}>();

const refPane: Ref<HTMLDivElement | null> = ref(null);

const isFocused = ref(false),
  isPressed = ref(false),
  isResizing = ref(false);

const paneComputedStyle = computed(() => {
  const splitterWidth =
    props.options?.splitterWidthNormal ?? props.options?.width;
  const _width = splitterWidth ?? 1;

  if (refPane.value && _width) {
    const _areaWidth = props.options.activeAreaWidth ?? _width;
    const _styles = paneBaseStyles(
      _width,
      _areaWidth,
      props.options?.position ?? "center"
    );
    return _styles[props.direction];
  }
  return undefined;
});

const splitterComputedStyle = computed(() => {
  const splitterWidth =
    props.options?.splitterWidthNormal ?? props.options?.width;
  const splitterWidthActive =
    props.options?.splitterWidthActive ?? splitterWidth;
  const activeAreaWidth = props.options.activeAreaWidth;

  const _width =
    isFocused.value ?? isPressed.value ? splitterWidthActive : splitterWidth;

  if (refPane.value && _width) {
    const _areaWidth = activeAreaWidth ?? splitterWidth ?? 1;
    const _styles = splitterBaseStyles(_width, _areaWidth);
    return _styles[props.direction];
  }
  return undefined;
});

const containerComputedStyles = computed(() => {
  const isHorizontal = checkIsHorizontal(props.direction);
  return { transform: `rotate(${isHorizontal ? 90 : 0}deg)` };
});

const updateCursor = (state: boolean) => {
  let cursorActive: string;

  if (checkIsHorizontal(props.direction)) {
    cursorActive = props.options?.cursor?.horizontal ?? "auto";
  } else if (checkIsVertical(props.direction)) {
    cursorActive = props.options?.cursor?.vertical ?? "auto";
  } else cursorActive = "auto";

  if (refPane.value) refPane.value.style.cursor = state ? cursorActive : "auto";
};

const emitFocus = (state: boolean) => {
  emits(Emits.FOCUS, state);
};

const onFocus = (e: PointerEvent, isFocused: boolean): void => {
  e.stopPropagation();
  onSelected(isFocused);
};

const onSelected = (state: boolean): void => {
  isFocused.value = state;
  updateCursor(state);
  emitFocus(state);
};

const onDragStart = (e: PointerEvent): void => {
  e.preventDefault();
  e.stopImmediatePropagation();

  if (!props.options.touchActions && e.pointerType === "touch") return;

  isResizing.value = true;
  isPressed.value = true;

  onSelected(true);

  const el = e.currentTarget as HTMLDivElement;
  el.setPointerCapture(e.pointerId);

  emits(Emits.DRAG_START, {
    x: Math.round(e.clientX),
    y: Math.round(e.clientY),
    dir: props.direction,
  });

  const onDragMove = (e: PointerEvent): void => {
    emits(Emits.DRAG_MOVE, {
      x: Math.round(e.clientX),
      y: Math.round(e.clientY),
      dir: props.direction,
    });
  };

  const onDragEnd = (e: PointerEvent): void => {
    isResizing.value = false;
    isPressed.value = false;

    el.releasePointerCapture(e.pointerId);

    el.removeEventListener("pointermove", onDragMove);
    el.removeEventListener("pointerup", onDragEnd);

    emits(Emits.DRAG_END, {
      x: Math.round(e.clientX),
      y: Math.round(e.clientY),
      dir: props.direction,
    });
  };

  el.addEventListener("pointermove", onDragMove);
  el.addEventListener("pointerup", onDragEnd);
};

const onDragCancel = (e: PointerEvent): void => {
  const el = e.currentTarget as HTMLDivElement;

  isResizing.value = false;
  el.releasePointerCapture(e.pointerId);

  emits(Emits.DRAG_END, {
    x: Math.round(e.clientX),
    y: Math.round(e.clientY),
    dir: props.direction,
  });
};

const addEventListeners = () => {
  const el = refPane.value;

  if (el) {
    el.addEventListener("pointerenter", onPointerEnter);
    el.addEventListener("pointerleave", onPointerLeave);
    el.addEventListener("pointerdown", onDragStart);
    el.addEventListener("pointercancel", onDragCancel);
  }
};

const removeEventListeners = () => {
  const el = refPane.value;

  if (el) {
    el.removeEventListener("pointerenter", onPointerEnter);
    el.removeEventListener("pointerleave", onPointerLeave);
    el.removeEventListener("pointerdown", onDragStart);
    el.removeEventListener("pointercancel", onDragCancel);
  }
};

const onPointerEnter = (e: PointerEvent) => onFocus(e, true);
const onPointerLeave = (e: PointerEvent) => onFocus(e, false);

onMounted(addEventListeners);
onUnmounted(removeEventListeners);

defineExpose({ refPane });
</script>

<script lang="ts">
export interface Props {
  prefix: string;
  direction: PaneDirections;
  options: Options;
  classNames: IResizeBoundingClassNames;
  styles?: Partial<IStyles>;
}

export enum Emits {
  FOCUS = "focus",
  DRAG_START = "drag:start",
  DRAG_MOVE = "drag:move",
  DRAG_END = "drag:end",
}

export interface PaneEmittedData {
  x: number;
  y: number;
  dir: PaneDirections | string;
}

const checkIsHorizontal = (direction: string): boolean =>
  new RegExp(
    `[${PaneDirections.LEFT} | ${PaneDirections.RIGHT} | ${PaneDirectionAliases.HORIZONTAL}]`
  ).test(direction);
const checkIsVertical = (direction: string): boolean =>
  new RegExp(
    `[${PaneDirections.TOP} | ${PaneDirections.BOTTOM} | ${PaneDirectionAliases.VERTICAL}]`
  ).test(direction);
</script>

<template>
  <div
    ref="refPane"
    data-testid="resize-bounding-pane"
    :class="[
      classNames.pane,
      { active: isFocused || isPressed },
      options.addStateClasses
        ? isPressed
          ? 'pressed'
          : isFocused
            ? 'focused'
            : 'normal'
        : '',
    ]"
    :style="[paneComputedStyle]"
  >
    <div
      data-testid="resize-bounding-splitter"
      :class="[classNames.splitter]"
      :style="[splitterComputedStyle]"
    >
      <div
        v-if="
          (isFocused || !options?.knob?.normalHidden) && options?.knob?.show
        "
        data-testid="resize-bounding-splitter-container"
        :class="[classNames.splitterContainer]"
        :style="[containerComputedStyles]"
      >
        <div data-testid="resize-bounding-knob" :class="[classNames.knob]">
          <slot v-if="$slots.default"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
