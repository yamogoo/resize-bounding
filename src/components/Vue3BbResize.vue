<template>
  <div
    ref="refRoot"
    class="bb-resize"
    :style="`width: ${width}px; min-width: ${width}px; height: ${height}px; min-height: ${height}px;`"
  >
    <div class="bb-resize__container">
      <slot :width></slot>
    </div>
    <template v-for="(pane, idx) in panes" :key="idx">
      <Vue3BbResizePane
        v-if="!disabled && pane.show"
        :direction="pane.direction"
        @drag:start="onDragStart"
        @drag:move="onDragMove"
        @drag:end="onDragEnd"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { ref, computed, provide, defineComponent, PropType } from "vue";

import type { BBResizeOptions } from "./typings";
import { StylesInjectionKey } from "./symbols";

import Vue3BbResizePane, {
  PaneDirections,
  type PaneEmittedData,
} from "./Vue3BbResizePane.vue";

export default defineComponent({
  setup(props, { emit }) {
    provide(StylesInjectionKey, props.styles);

    const refRoot = ref<HTMLDivElement | null>(null);

    let { width: newWidth, height: newHeight } = props;
    let prevWidth = newWidth,
      prevHeight = newHeight;

    const panes = computed(() => ({
      left: {
        show:
          RegExp(PaneDirections.LEFT).test(props.directions) ||
          RegExp(PaneDirections.HORIZONTAL).test(props.directions),
        direction: PaneDirections.LEFT,
      },
      right: {
        show:
          RegExp(PaneDirections.RIGHT).test(props.directions) ||
          RegExp(PaneDirections.HORIZONTAL).test(props.directions),
        direction: PaneDirections.RIGHT,
      },
      bottom: {
        show:
          RegExp(PaneDirections.BOTTOM).test(props.directions) ||
          RegExp(PaneDirections.VERTICAL).test(props.directions),
        direction: PaneDirections.BOTTOM,
      },
      top: {
        show:
          RegExp(PaneDirections.TOP).test(props.directions) ||
          RegExp(PaneDirections.VERTICAL).test(props.directions),
        direction: PaneDirections.TOP,
      },
    }));

    let startWidth = props.width ?? 0,
      startHeight = props.height ?? 0;

    let startX = 0,
      startY = 0;

    const onDragStart = ({ x, y, dir }: PaneEmittedData): void => {
      startWidth = props.width ?? 0;
      startHeight = props.height ?? 0;

      startX = x;
      startY = y;

      emit("drag:start", dir);
    };

    const isInRange = (
      min: number,
      max: number | undefined,
      prev: number | undefined,
      next: number
    ): boolean => {
      return (
        next > min && next < (max ?? Number.POSITIVE_INFINITY) && prev !== next
      );
    };

    const onDragMove = ({ x, y, dir }: PaneEmittedData): void => {
      if (!refRoot.value) return;

      emit("drag:move", dir);

      switch (dir) {
        case PaneDirections.BOTTOM:
          newHeight = startHeight + (y - startY);

          if (
            isInRange(props.minHeight, props.maxHeight, prevHeight, newHeight)
          ) {
            emit("update:height", newHeight);
            prevHeight = newHeight;
          }
          break;
        case PaneDirections.TOP:
          newHeight = startHeight + (startY - y);

          if (
            isInRange(props.minHeight, props.maxHeight, prevHeight, newHeight)
          ) {
            emit("update:height", newHeight);
            prevHeight = newHeight;
          }
          break;
        case PaneDirections.RIGHT:
          newWidth = startWidth + (x - startX);

          if (isInRange(props.minWidth, props.maxWidth, prevWidth, newWidth)) {
            emit("update:width", newWidth);
            prevWidth = newWidth;
          }
          break;
        case PaneDirections.LEFT:
          newWidth = startWidth + (startX - x);

          if (isInRange(props.minWidth, props.maxWidth, prevWidth, newWidth)) {
            emit("update:width", newWidth);
            prevWidth = newWidth;
          }
          break;
      }
    };

    const onDragEnd = ({ dir }: PaneEmittedData): void => {
      emit("drag:end", dir);
    };

    return {
      refRoot,
      onDragStart,
      onDragMove,
      onDragEnd,
      panes,
      PaneDirections,
    };
  },
  emits: [
    "update:width",
    "update:height",
    "drag:start",
    "drag:move",
    "drag:end",
  ],
  props: {
    width: {
      type: Number,
      default: undefined,
    },
    height: {
      type: Number,
      default: undefined,
    },
    minWidth: {
      type: Number,
      default: 0,
    },
    maxWidth: {
      type: Number,
      default: undefined,
    },
    minHeight: {
      type: Number,
      default: 0,
    },
    maxHeight: {
      type: Number,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    directions: {
      type: String as PropType<PaneDirections | string>,
      default: PaneDirections.RIGHT,
    },
    styles: {
      type: Object as PropType<BBResizeOptions>,
      default: {
        cursor: {
          active: {
            horizontal: "col-resize",
            vertical: "row-resize",
          },
        },
      },
    },
  },
  name: "Vue3BbResize",
  components: { Vue3BbResizePane },
});
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

    &.--l {
      left: 0px;
      width: 0px;
      height: 100%;

      .bb-resize__pane__splitter {
        right: 0;
        width: 4px;
        height: 100%;
      }
    }

    &.--r {
      right: 0px;
      width: 0px;
      height: 100%;

      .bb-resize__pane__splitter {
        left: 0;
        width: 4px;
        height: 100%;
      }
    }

    &.--b {
      bottom: 0px;
      height: 0px;
      width: 100%;

      .bb-resize__pane__splitter {
        top: 0;
        width: 100%;
        height: 4px;
      }
    }

    &.--t {
      top: 0px;
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
