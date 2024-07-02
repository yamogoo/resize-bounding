<template>
  <div
    :class="[
      `${prefix}-${styles?.class}`,
      `--${direction}`,
      isFocused ? 'show' : 'hide',
    ]"
    data-testid="boundarize-pane"
    :style="[styles?.style, paneComputedStyle]"
  >
    <div
      ref="refPane"
      data-testid="boundarize-splitter"
      :class="[
        `${prefix}-${styles.splitter.class}`,
        { [`${styles?.splitter?.focused?.class}`]: isFocused },
      ]"
      :style="[
        styles?.splitter?.style,
        isFocused ? styles.splitter.focused?.style : {},
        splitterComputedStyle,
      ]"
    >
      <div
        v-if="
          (isFocused || options?.knob?.constantlyShow) && options?.knob?.show
        "
        data-testid="boundarize-knob"
        :class="[`${prefix}-${styles?.knob?.class}`]"
        :style="[
          styles?.knob?.style,
          isFocused ? styles?.knob?.focused?.style : {},
          knobComputedStyle,
        ]"
      >
        <slot v-if="$slots"></slot>
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

import { BBResize } from "../shared/typings";

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

const paneComputedStyle = computed(() => {
  const _width = props.options?.width ?? 1;

  if (refPane.value && _width) {
    const _styles = paneBaseStyles(_width);
    const value: HTMLAttributes["style"] =
      _styles[props.direction as PaneDirections];
    return value;
  }

  return;
});

const splitterComputedStyle = computed(() => {
  const _width = props.options?.width;

  if (refPane.value && _width) {
    const _styles = splitterBaseStyles(
      _width,
      props.options?.position ?? BBResize.SplitterPositions.CENTER,
    );
    const value: HTMLAttributes["style"] =
      _styles[props.direction as PaneDirections];
    return value;
  }
});

const isFocused = ref(false);
let isResizing = false;

const knobComputedStyle = computed(() => {
  const isHorizontal = checkIsHorizontal();
  return { transform: `rotate(${isHorizontal ? 90 : 0}deg)` };
});

const checkIsHorizontal = (): boolean =>
  new RegExp(
    `[${PaneDirections.LEFT} | ${PaneDirections.RIGHT} | ${PaneDirectionAliases.HORIZONTAL}]`,
  ).test(props.direction);
const checkIsVertical = (): boolean =>
  new RegExp(
    `[${PaneDirections.TOP} | ${PaneDirections.BOTTOM} | ${PaneDirectionAliases.VERTICAL}]`,
  ).test(props.direction);

const updateCursor = (state: boolean) => {
  let cursorActive: string;

  if (checkIsHorizontal()) {
    cursorActive = props.options?.cursor?.horizontal ?? "auto";
  } else if (checkIsVertical()) {
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

  isResizing = true;
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

    onSelected(isResizing);
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
export interface Props {
  prefix: string;
  direction: PaneDirectionKey;
  options: BBResize.PaneOptions;
  styles: BBResize.PaneStyles;
}

export enum PaneDirectionAliases {
  HORIZONTAL = "h",
  VERTICAL = "v",
}

export enum PaneDirections {
  LEFT = "l",
  RIGHT = "r",
  BOTTOM = "b",
  TOP = "t",
}

export type PaneDirectionKey = PaneDirections | PaneDirections | string;

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

export const paneBaseStyles = (
  size: number,
): Record<PaneDirections, HTMLAttributes["style"]> => {
  const _offset = `${size / 2}px`;

  return {
    l: { top: "0px", left: _offset, width: "0px", height: "100%" },
    r: { top: "0px", right: _offset, width: "0px", height: "100%" },
    t: { left: "0px", top: _offset, width: "100%", height: "0px" },
    b: { left: "0px", bottom: _offset, width: "100%", height: "0px" },
  };
};

export const splitterBaseStyles = (
  size: number,
  position: BBResize.PanePosition,
): Record<PaneDirections, HTMLAttributes["style"]> => {
  const _size = `${size}px`;

  let _offset: string = "0px";

  switch (position) {
    case BBResize.SplitterPositions.CENTER:
      _offset = `0px`;
      break;
    case BBResize.SplitterPositions.EXTERNAL:
      _offset = `${size / 2}px`;
      break;
    case BBResize.SplitterPositions.INTERNAL:
      _offset = `-${size / 2}px`;
      break;
  }

  return {
    l: { right: _offset, width: _size, height: "100%" },
    r: { left: _offset, width: _size, height: "100%" },
    t: { bottom: _offset, height: _size, width: "100%" },
    b: { top: _offset, height: _size, width: "100%" },
  };
};
</script>

<!-- <style lang="scss">
$__show-color: blue;
$__pressed-color: #3655e171;

// .boundarize {
//   &-pane {
//     position: absolute;
//     display: block;
//     z-index: 9999;

//     // &.--l {

//     //   .boundarize__pane__splitter {
//     //   }
//     // }

//     // &.--r {

//     //   .boundarize__pane__splitter {
//     //   }
//     // }

//     // &.--b {

//     //   .boundarize__pane__splitter {
//     //   }
//     // }

//     // &.--t {

//     //   .boundarize__pane__splitter {
//     //   }
//     // }
//   }

//   &-splitter {
//     // display: flex;
//     // align-items: center;
//     // justify-content: center;
//     // z-index: 9999;
//     // background-color: none;
//   }

//   &-splitter {
//     position: absolute;

//     &.show {
//       background-color: $__show-color;
//     }

//     &.pressed {
//       background-color: $__pressed-color;
//     }
//   }

//   &-knob {
//     position: absolute;
//     width: 12px;
//     height: 120px;
//     border-radius: 12px;
//     background-color: red;
//     margin: auto;
//   }
// }
</style> -->
