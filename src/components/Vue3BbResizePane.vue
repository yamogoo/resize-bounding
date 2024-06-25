<template>
  <div
    :class="['bb-resize__pane', `--${direction}`]"
    data-testid="bb-resize-pane"
  >
    <div
      ref="refPane"
      data-testid="bb-resize-pane-splitter"
      :class="['bb-resize__pane__splitter', isSplitterShown ? 'show' : 'hide']"
    >
      <div
        v-if="isSplitterShown || constantlyShowKnob"
        class="bb-resize__pane__splitter__icon"
        :style="knobStyle"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, inject, ref, type Ref, computed } from "vue";

import { StylesInjectionKey } from "./symbols";

export interface Props {
  direction?: PaneDirections;
  constantlyShowKnob?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  direction: PaneDirections.RIGHT,
  constantlyShowKnob: false,
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

const knobStyle = computed(() => {
  const isHorizontal = checkIsHorizontal();
  return `transform: rotate(${isHorizontal ? 0 : 90}deg);`;
});

const checkIsHorizontal = (): boolean => /[l | r | h]/.test(props.direction);
const checkIsVertical = (): boolean => /[t | b | v]/.test(props.direction);

const updateCursor = (state: boolean) => {
  const body = document.body;

  let cursorActive: string | undefined;

  if (checkIsHorizontal()) {
    cursorActive = styles?.cursor.active.horizontal;
  } else if (checkIsVertical()) {
    cursorActive = styles?.cursor.active.vertical;
  }

  body.style.cursor = state ? cursorActive ?? "auto" : "auto";
};

const emitFocus = (state: boolean) => {
  emits("focus", state);
};

const onFocus = (e: PointerEvent, isFocused: boolean): void => {
  e.stopPropagation();

  const { pointerType } = e;

  if (pointerType === "touch") return;
  else {
    onSelected(isFocused);
  }
};

const onSelected = (state: boolean): void => {
  if (!(state === false && isResizing)) {
    isSplitterShown.value = state;
    updateCursor(state);
    emitFocus(state);

    if (state && refPane.value)
      refPane.value.addEventListener("pointerdown", onDragStart);
    else if (!state && refPane.value)
      refPane.value.removeEventListener("pointerdown", onDragStart);
  }
};

const onDragStart = (e: PointerEvent): void => {
  e.preventDefault();
  e.stopImmediatePropagation();

  isResizing = true;
  onSelected(true);

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

    onSelected(false);
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
      e,
    );
  };

  document.addEventListener("pointermove", onDragMove);
  document.addEventListener("pointerup", onDragEnd);
};

const addEventListeners = () => {
  if (refPane.value) {
    refPane.value.addEventListener("pointerenter", (e) => onFocus(e, true));
    refPane.value.addEventListener("pointerleave", (e) => onFocus(e, false));
  }
};

const removeEventListeners = () => {
  if (refPane.value) {
    refPane.value.removeEventListener("pointerenter", (e) => onFocus(e, true));
    refPane.value.removeEventListener("pointerleave", (e) => onFocus(e, false));
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
