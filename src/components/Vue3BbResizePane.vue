<template>
  <div :class="['bb-resize__pane', `--${dir}`]" data-testid="bb-resize-pane">
    <div
      ref="refPane"
      data-testid="bb-resize-pane-splitter"
      :class="['bb-resize__pane__splitter', isSplitterShown ? 'show' : 'hide']"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref } from "vue";

export interface Props {
  dir: BbResizePaneDirections;
}

const props = withDefaults(defineProps<Props>(), {
  dir: BbResizePaneDirections.RIGHT,
});

const emits = defineEmits<{
  (e: "drag:start", ev: PointerEvent): void;
  (e: "drag:move", data: BbResizePaneEmittedData): void;
  (e: "drag:end", ev: PointerEvent): void;
  (e: "focus", isFocused: boolean): void;
}>();

const refPane: Ref<HTMLDivElement | null> = ref(null);
const isSplitterShown: Ref<boolean> = ref(false);

let isResizing = false;

const cursorActive =
  props.dir === BbResizePaneDirections.RIGHT ? "col-resize" : "row-resize";

onMounted(() => {
  if (refPane.value) {
    refPane.value.addEventListener("mouseenter", onMouseEnter.bind(null, true));
    refPane.value.addEventListener(
      "mouseleave",
      onMouseEnter.bind(null, false)
    );

    refPane.value.addEventListener("pointerdown", onDragStart);
  }
});

onUnmounted(() => {
  if (refPane.value) {
    refPane.value.removeEventListener(
      "mouseenter",
      onMouseEnter.bind(this, true)
    );
    refPane.value.removeEventListener(
      "mouseleave",
      onMouseEnter.bind(this, false)
    );

    refPane.value.removeEventListener("pointerdown", onDragStart);
  }
});

const onMouseEnter = (state: boolean): void => {
  if (!(state === false && isResizing)) {
    isSplitterShown.value = state;

    const body = document.querySelector("body") as HTMLBodyElement;
    const cursor = state ? cursorActive : "auto";
    body.style.cursor = cursor;

    emits("focus", state);
  }
};

const onDragStart = (e: PointerEvent): void => {
  e.preventDefault();
  e.stopImmediatePropagation();

  isResizing = true;
  onMouseEnter(true);

  const body = document.querySelector("body") as HTMLBodyElement;
  body.style.cursor = cursorActive;

  emits("drag:start", e);

  const onDragMove = (e: PointerEvent): void => {
    const x = e.clientX;
    const y = e.clientY;

    const dir = props.dir;

    emits("drag:move", { x, y, dir });
  };

  const onDragEnd = (e: PointerEvent): void => {
    e.stopPropagation();

    isResizing = false;
    onMouseEnter(false);

    body.style.cursor = "auto";

    document.removeEventListener("pointermove", onDragMove);
    document.removeEventListener("pointerup", onDragEnd);
    emits("drag:end", e);
  };

  document.addEventListener("pointermove", onDragMove);
  document.addEventListener("pointerup", onDragEnd);
};

defineExpose({ refPane });
</script>

<script lang="ts">
export enum BbResizePaneDirections {
  RIGHT = "right",
  BOTTOM = "bottom",
}

export interface BbResizePaneEmittedData {
  x: number;
  y: number;
  dir: BbResizePaneDirections | string;
}
</script>
