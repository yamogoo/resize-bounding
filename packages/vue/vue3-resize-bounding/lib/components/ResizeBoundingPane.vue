<template>
  <div
    ref="refPane"
    data-testid="resize-bounding-pane"
    :class="[
      classNames.pane,
      { active: isFocused || isPressed },
      options.addStateClasses && {
        normal: !isPressed && !isFocused,
        focused: isFocused,
        pressed: isPressed,
      },
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

<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  ref,
  type Ref,
  computed,
  type HTMLAttributes,
} from "vue";

import {
  SplitterPositions,
  type IStyles,
  type Options,
  type IResizeBoundingClassNames,
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
  isPressed = ref(false);

let isResizing = false;

const paneComputedStyle = computed(() => {
  const _width = props.options?.width ?? 1;

  if (refPane.value && _width) {
    const _areaWidth = props.options.activeAreaWidth ?? props.options.width;
    const _styles = paneBaseStyles(
      _width,
      _areaWidth,
      props.options?.position ?? SplitterPositions.CENTER,
    );
    const value: HTMLAttributes["style"] =
      _styles[props.direction as PaneDirections];
    return value;
  }
  return;
});

const splitterComputedStyle = computed(() => {
  const _width = props.options?.width;

  if (refPane.value && _width) {
    const _areaWidth = props.options.activeAreaWidth ?? props.options.width;

    const _styles = splitterBaseStyles(_width, _areaWidth);
    const value: HTMLAttributes["style"] =
      _styles[props.direction as PaneDirections];
    return value;
  }
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

  isResizing = true;
  isPressed.value = true;

  onSelected(isResizing);

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
    isResizing = false;
    isPressed.value = false;

    updateCursor(isResizing);

    const el = e.currentTarget as HTMLDivElement;
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

  isResizing = false;
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
    el.addEventListener("pointerenter", (e) => onFocus(e, true));
    el.addEventListener("pointerleave", (e) => onFocus(e, false));

    el.addEventListener("pointerdown", onDragStart);
    el.addEventListener("pointercancel", onDragCancel);
  }
};

const removeEventListeners = () => {
  const el = refPane.value;

  if (el) {
    el.removeEventListener("pointerenter", (e) => onFocus(e, true));
    el.removeEventListener("pointerleave", (e) => onFocus(e, false));

    el.removeEventListener("pointerdown", onDragStart);
    el.addEventListener("pointercancel", onDragCancel);
  }
};

onMounted(addEventListeners);
onUnmounted(removeEventListeners);

defineExpose({ refPane });
</script>

<script lang="ts">
import { PaneDirections, type PaneDirectionKey } from "../shared/typings";

export interface Props {
  prefix: string;
  direction: PaneDirectionKey;
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
  dir: string;
}

const checkIsHorizontal = (direction: string): boolean =>
  new RegExp(
    `[${PaneDirections.LEFT} | ${PaneDirections.RIGHT} | ${PaneDirectionAliases.HORIZONTAL}]`,
  ).test(direction);
const checkIsVertical = (direction: string): boolean =>
  new RegExp(
    `[${PaneDirections.TOP} | ${PaneDirections.BOTTOM} | ${PaneDirectionAliases.VERTICAL}]`,
  ).test(direction);
</script>
