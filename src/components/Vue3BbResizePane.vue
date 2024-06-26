<template>
  <div
    :class="['bb-resize__pane', `--${direction}`]"
    data-testid="bb-resize-pane"
  >
    <div
      ref="refPane"
      data-testid="bb-resize-pane-splitter"
      :class="['bb-resize__pane__splitter', isFocused ? 'show' : 'hide']"
    >
      <div
        v-if="isFocused || constantlyShowKnob"
        class="bb-resize__pane__splitter__icon"
        :style="knobStyle"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref, computed } from "vue";

import type { BBResizeStyles, BBResizeOptions } from "./typings";

const props = withDefaults(defineProps<Props>(), {
  direction: PaneDirections.RIGHT,
  constantlyShowKnob: false,
});

const emits = defineEmits<{
  (e: Emits.DRAG_START, data: PaneEmittedData): void;
  (e: Emits.DRAG_MOVE, data: PaneEmittedData): void;
  (e: Emits.DRAG_END, data: PaneEmittedData): void;
  (e: Emits.FOCUS, isFocused: boolean): void;
}>();

const refPane: Ref<HTMLDivElement | null> = ref(null);

const isFocused = ref(false);
let isResizing = false;

const knobStyle = computed(() => {
  const isHorizontal = checkIsHorizontal();
  return `transform: rotate(${isHorizontal ? 0 : 90}deg);`;
});

const checkIsHorizontal = (): boolean => /[l | r | h]/.test(props.direction);
const checkIsVertical = (): boolean => /[t | b | v]/.test(props.direction);

const updateCursor = (state: boolean) => {
  let cursorActive: string;

  if (checkIsHorizontal()) {
    cursorActive = props.styles?.cursor?.active.horizontal ?? "col-resize";
  } else if (checkIsVertical()) {
    cursorActive = props.styles?.cursor?.active.vertical ?? "row-resize";
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
  direction?: PaneDirectionKey;
  constantlyShowKnob?: boolean;
  styles?: Partial<BBResizeStyles>;
  options?: Partial<BBResizeOptions>;
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
</script>

<style lang="scss">
$__show-color: blue;
$__pressed-color: #3655e171;

.bb-resize {
  .bb-resize__pane__splitter {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .bb-resize__pane__splitter__icon {
    position: absolute;
    width: 12px;
    height: 120px;
    border-radius: 12px;
    background-color: red;
    margin: auto;
  }

  &__pane {
    position: absolute;
    display: block;
    z-index: 9999;

    &.--l {
      left: 2px;
      width: 0px;
      height: 100%;

      .bb-resize__pane__splitter {
        right: 0;
        width: 4px;
        height: 100%;
      }
    }

    &.--r {
      right: 2px;
      width: 0px;
      height: 100%;

      .bb-resize__pane__splitter {
        left: 0;
        width: 4px;
        height: 100%;
      }
    }

    &.--b {
      bottom: -2px;
      height: 0px;
      width: 100%;

      .bb-resize__pane__splitter {
        top: 0;
        width: 100%;
        height: 4px;
      }
    }

    &.--t {
      top: 2px;
      height: 0px;
      width: 100%;

      .bb-resize__pane__splitter {
        bottom: 0;
        width: 100%;
        height: 4px;
      }
    }

    &__splitter {
      position: absolute;
      display: block;
      z-index: 0;

      &.show {
        background-color: $__show-color;
      }

      &.pressed {
        background-color: $__pressed-color;
      }
    }
  }
}
</style>
