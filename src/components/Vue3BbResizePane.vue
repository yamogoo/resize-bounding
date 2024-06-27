<template>
  <div
    :class="[`${prefix}__pane`, `--${direction}`]"
    data-testid="bb-resize-pane"
    :style="[paneComputedStyle, styles?.pane]"
  >
    <div
      ref="refPane"
      data-testid="bb-resize-splitter"
      :class="[`${prefix}__splitter`, isFocused ? 'show' : 'hide']"
      :style="[splitterComputedStyle, styles?.splitter]"
    >
      <div
        v-if="isFocused || options?.knob?.constantlyShow"
        data-testid="bb-resize-knob"
        :class="[`${prefix}__knob`]"
        :style="[knobComputedStyle, styles?.knob]"
      ></div>
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
  type ComputedRef,
  type HTMLAttributes,
} from "vue";

import type { BBResize } from "./typings";

const props = withDefaults(defineProps<Props>(), {
  direction: PaneDirections.RIGHT,
});

const emits = defineEmits<{
  (e: Emits.DRAG_START, data: PaneEmittedData): void;
  (e: Emits.DRAG_MOVE, data: PaneEmittedData): void;
  (e: Emits.DRAG_END, data: PaneEmittedData): void;
  (e: Emits.FOCUS, isFocused: boolean): void;
}>();

const options: ComputedRef<BBResize.PaneOptions> = computed(() => {
  return {
    ...{
      width: 4,
      knob: {
        constantlyShow: false,
      },
      cursor: {
        horizontal: "col-resize",
        vertical: "row-resize",
      },
    },
    ...props.options,
  };
});

const refPane: Ref<HTMLDivElement | null> = ref(null);

const paneComputedStyle = computed(() => {
  const _width = options.value.width;

  if (refPane.value && _width) {
    const _styles = paneStylesMap(_width);
    const value: HTMLAttributes["style"] =
      _styles[props.direction as PaneDirections];
    return value;
  }
});

const splitterComputedStyle = computed(() => {
  const _width = options.value.width;

  if (refPane.value && _width) {
    const _styles = splitterStylesMap(_width);
    const value: HTMLAttributes["style"] =
      _styles[props.direction as PaneDirections];
    return value;
  }
});

const isFocused = ref(false);
let isResizing = false;

const knobComputedStyle = computed(() => {
  const isHorizontal = checkIsHorizontal();
  return { transform: `rotate(${isHorizontal ? 0 : 90}deg)` };
});

const checkIsHorizontal = (): boolean => /[l | r | h]/.test(props.direction);
const checkIsVertical = (): boolean => /[t | b | v]/.test(props.direction);

const updateCursor = (state: boolean) => {
  let cursorActive: string;

  if (checkIsHorizontal()) {
    cursorActive = props.options?.cursor?.horizontal ?? "col-resize";
  } else if (checkIsVertical()) {
    cursorActive = props.options?.cursor?.vertical ?? "row-resize";
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
  direction?: PaneDirectionKey;
  options?: Partial<BBResize.PaneOptions>;
  styles?: Partial<BBResize.Styles>;
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

export const paneStylesMap = (
  size: number,
): Record<PaneDirections, HTMLAttributes["style"]> => {
  const offset = `${size / 2}px`;
  return {
    l: { top: 0, left: offset, width: "0px", height: "100%" },
    r: { top: 0, right: offset, width: "0px", height: "100%" },
    t: { left: 0, top: offset, width: "100%", height: "0px" },
    b: { left: 0, bottom: offset, width: "100%", height: "0px" },
  };
};

export const splitterStylesMap = (
  size: number,
): Record<PaneDirections, HTMLAttributes["style"]> => {
  const _size = `${size}px`;

  return {
    l: { right: 0, width: _size, height: "100%" },
    r: { left: 0, width: _size, height: "100%" },
    t: { bottom: 0, height: _size, width: "100%" },
    b: { top: 0, height: _size, width: "100%" },
  };
};
</script>

<style lang="scss">
$__show-color: blue;
$__pressed-color: #3655e171;

.bb-resize {
  &__pane {
    position: absolute;
    display: block;
    z-index: 9999;

    // &.--l {

    //   .bb-resize__pane__splitter {
    //   }
    // }

    // &.--r {

    //   .bb-resize__pane__splitter {
    //   }
    // }

    // &.--b {

    //   .bb-resize__pane__splitter {
    //   }
    // }

    // &.--t {

    //   .bb-resize__pane__splitter {
    //   }
    // }
  }

  &__splitter {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  &__splitter {
    position: absolute;

    &.show {
      background-color: $__show-color;
    }

    &.pressed {
      background-color: $__pressed-color;
    }
  }

  &__knob {
    position: absolute;
    width: 12px;
    height: 120px;
    border-radius: 12px;
    background-color: red;
    margin: auto;
  }
}
</style>
