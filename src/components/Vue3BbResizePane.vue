<template>
  <div
    :class="['bb-resize__pane', `--${direction}`]"
    data-testid="bb-resize-pane"
  >
    <div
      ref="refPane"
      data-testid="bb-resize-pane-splitter"
      :class="['bb-resize__pane__splitter', isSplitterShown ? 'show' : 'hide']"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, inject, ref, type Ref } from "vue";

import { StylesInjectionKey } from "./symbols";

export interface Props {
  direction?: PaneDirections;
}

const props = withDefaults(defineProps<Props>(), {
  direction: PaneDirections.RIGHT,
});

const emits = defineEmits<{
  (e: "drag:start", data: PaneEmittedData): void;
  (e: "drag:move", data: PaneEmittedData): void;
  (e: "drag:end", data: PaneEmittedData, ev: PointerEvent): void;
  (e: "focus", isFocused: boolean): void;
}>();

const styles = inject(StylesInjectionKey);

const refPane: Ref<HTMLDivElement | null> = ref(null);

const isSplitterShown = ref(false);
let isResizing = false;

const updateCursor = (state: boolean) => {
  const body = document.body;

  let cursorActive: string | undefined;

  if (
    props.direction === PaneDirections.RIGHT ||
    props.direction === PaneDirections.LEFT
  ) {
    cursorActive = styles?.cursor.active.horizontal;
  } else if (
    props.direction === PaneDirections.TOP ||
    props.direction === PaneDirections.BOTTOM
  ) {
    cursorActive = styles?.cursor.active.vertical;
  }

  body.style.cursor = state ? cursorActive ?? "auto" : "auto";
};

const emitFocus = (state: boolean) => {
  emits("focus", state);
};

const onMouseEnter = (state: boolean): void => {
  if (!(state === false && isResizing)) {
    isSplitterShown.value = state;
    updateCursor(state);
    emitFocus(state);
  }
};

const onDragStart = (e: PointerEvent): void => {
  e.preventDefault();
  e.stopImmediatePropagation();

  isResizing = true;
  onMouseEnter(true);

  emits("drag:start", {
    x: Math.round(e.clientX),
    y: Math.round(e.clientY),
    dir: props.direction,
  });

  const onDragMove = (e: PointerEvent): void => {
    emits("drag:move", {
      x: Math.round(e.clientX),
      y: Math.round(e.clientY),
      dir: props.direction,
    });
  };

  const onDragEnd = (e: PointerEvent): void => {
    isResizing = false;

    onMouseEnter(false);
    updateCursor(false);

    document.removeEventListener("pointermove", onDragMove);
    document.removeEventListener("pointerup", onDragEnd);

    emits(
      "drag:end",
      {
        x: Math.round(e.clientX),
        y: Math.round(e.clientY),
        dir: props.direction,
      },
      e
    );
  };

  document.addEventListener("pointermove", onDragMove);
  document.addEventListener("pointerup", onDragEnd);
};

const addEventListeners = () => {
  if (refPane.value) {
    refPane.value.addEventListener("mouseenter", () => onMouseEnter(true));
    refPane.value.addEventListener("mouseleave", () => onMouseEnter(false));

    refPane.value.addEventListener("pointerdown", onDragStart);
  }
};

const removeEventListeners = () => {
  if (refPane.value) {
    refPane.value.removeEventListener("mouseenter", () => onMouseEnter(true));
    refPane.value.removeEventListener("mouseleave", () => onMouseEnter(false));

    refPane.value.removeEventListener("pointerdown", onDragStart);
  }
};

onMounted(addEventListeners);
onUnmounted(removeEventListeners);

defineExpose({ refPane });
</script>

<script lang="ts">
export enum PaneDirections {
  LEFT = "l",
  RIGHT = "r",
  BOTTOM = "b",
  TOP = "t",
  HORIZONTAL = "h",
  VERTICAL = "v",
}

export interface PaneEmittedData {
  x: number;
  y: number;
  dir: string;
}
</script>
