<template>
  <div
    ref="refRoot"
    class="bb-resize"
    :style="`width: ${width}px; min-width: ${width}px; height: ${height}px; min-height: ${height}px;`"
  >
    <div class="bb-resize__container">
      <slot :width></slot>
    </div>
    <Vue3BbResizePane
      v-if="!isDisabled"
      :dir="BbResizePaneDirections.RIGHT"
      @drag:move="onDragMove"
    />
    <Vue3BbResizePane
      v-if="!isDisabled"
      :dir="BbResizePaneDirections.BOTTOM"
      @drag:move="onDragMove"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import Vue3BbResizePane, {
  BbResizePaneDirections,
  type BbResizePaneEmittedData,
} from "./Vue3BbResizePane.vue";

export interface Props {
  width?: number;
  height?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  isDisabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  width: undefined,
  minWidth: 0,
  maxWidth: undefined,
  minHeight: 0,
  maxHeight: undefined,
  isDisabled: false,
});

const emits = defineEmits<{
  (e: "update:width", width: number): void;
  (e: "update:height", height: number): void;
}>();

const refRoot = ref<HTMLDivElement | null>(null);

let newWidth = props.width,
  newHeight = props.height;

let prevWidth = newWidth,
  prevHeight = newHeight;

const onDragMove = ({ x, y, dir }: BbResizePaneEmittedData): void => {
  if (refRoot.value) {
    const rootBoundings = refRoot.value.getBoundingClientRect();

    if (dir === BbResizePaneDirections.BOTTOM) {
      newHeight = Math.round(y - rootBoundings.top);
      if (
        newHeight > props.minHeight &&
        newHeight < (props.maxHeight ?? Number.POSITIVE_INFINITY) &&
        prevHeight !== newHeight
      )
        emits("update:height", newHeight);

      prevWidth = newWidth;
    } else if (dir === BbResizePaneDirections.RIGHT) {
      newWidth = Math.round(x - rootBoundings.left);
      if (
        newWidth > props.minWidth &&
        newWidth < (props.maxWidth ?? Number.POSITIVE_INFINITY) &&
        prevWidth !== newWidth
      )
        emits("update:width", newWidth);

      prevWidth = newWidth;
    }
  }
};

defineExpose({ refRoot });
</script>

<style lang="scss">
$__show-color: blue;
$__pressed-color: #3655e171;

.bb-resize {
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100%;

  &__container {
    position: relative;
    display: block;
    width: 100%;
  }

  &__pane {
    position: absolute;
    display: block;
    z-index: 9999;

    &.--right {
      right: 0px;
      width: 0px;
      height: 100%;

      .bb-resize__pane__splitter {
        left: 0;
        width: 4px;
        height: 100%;
      }
    }

    &.--bottom {
      bottom: 0px;
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
