<template>
  <div
    ref="refRoot"
    class="bb-resize"
    data-testid="bb-resize"
    :style="`width: ${width}px; min-width: ${width}px; height: ${height}px; min-height: ${height}px;`"
  >
    <slot :width :height></slot>
    <template v-for="({ show, direction }, idx) in panes" :key="idx">
      <Vue3BbResizePane
        v-if="!disabled && show"
        :direction="direction"
        :constantlyShowKnob="options?.pane.knob.constantlyShow"
        :styles
        :options
        @focus="
          (isFocused) => {
            $emit(Emits.FOCUS, { state: isFocused, direction });
          }
        "
        @drag:start="onDragStart"
        @drag:move="onDragMove"
        @drag:end="onDragEnd"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, type PropType } from "vue";

import type { BBResizeOptions, BBResizeStyles } from "./typings";

import Vue3BbResizePane, {
  PaneDirectionAliases,
  PaneDirections,
  type PaneDirectionKey,
  type PaneEmittedData,
} from "./Vue3BbResizePane.vue";

export enum Emits {
  FOCUS = "focus",
  UPDATE_WIDTH = "update:width",
  UPDATE_HEIGHT = "update:height",
  DRAG_START = "drag:start",
  DRAG_MOVE = "drag:move",
  DRAG_END = "drag:end",
}

export default defineComponent({
  setup(props, { emit }) {
    const refRoot = ref<HTMLDivElement | null>(null);

    let { width: newWidth, height: newHeight } = props;
    let prevWidth = newWidth,
      prevHeight = newHeight;

    const panes = computed(() => ({
      left: {
        show:
          RegExp(PaneDirections.LEFT).test(props.directions) ||
          RegExp(PaneDirectionAliases.HORIZONTAL).test(props.directions),
        direction: PaneDirections.LEFT,
      },
      right: {
        show:
          RegExp(PaneDirections.RIGHT).test(props.directions) ||
          RegExp(PaneDirectionAliases.HORIZONTAL).test(props.directions),
        direction: PaneDirections.RIGHT,
      },
      bottom: {
        show:
          RegExp(PaneDirections.BOTTOM).test(props.directions) ||
          RegExp(PaneDirectionAliases.VERTICAL).test(props.directions),
        direction: PaneDirections.BOTTOM,
      },
      top: {
        show:
          RegExp(PaneDirections.TOP).test(props.directions) ||
          RegExp(PaneDirectionAliases.VERTICAL).test(props.directions),
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

      emit(Emits.DRAG_START, dir);
    };

    const isInRange = (
      min: number,
      max: number | undefined,
      prev: number | undefined,
      next: number,
    ): boolean => {
      return (
        next > min && next < (max ?? Number.POSITIVE_INFINITY) && prev !== next
      );
    };

    const onDragMove = ({ x, y, dir }: PaneEmittedData): void => {
      if (!refRoot.value) return;

      emit(Emits.DRAG_MOVE, dir);

      switch (dir) {
        case PaneDirections.BOTTOM:
          newHeight = startHeight + (y - startY);

          if (
            isInRange(props.minHeight, props.maxHeight, prevHeight, newHeight)
          ) {
            emit(Emits.UPDATE_HEIGHT, newHeight);
            prevHeight = newHeight;
          }
          break;
        case PaneDirections.TOP:
          newHeight = startHeight + (startY - y);

          if (
            isInRange(props.minHeight, props.maxHeight, prevHeight, newHeight)
          ) {
            emit(Emits.UPDATE_HEIGHT, newHeight);
            prevHeight = newHeight;
          }
          break;
        case PaneDirections.RIGHT:
          newWidth = startWidth + (x - startX);

          if (isInRange(props.minWidth, props.maxWidth, prevWidth, newWidth)) {
            emit(Emits.UPDATE_WIDTH, newWidth);
            prevWidth = newWidth;
          }
          break;
        case PaneDirections.LEFT:
          newWidth = startWidth + (startX - x);

          if (isInRange(props.minWidth, props.maxWidth, prevWidth, newWidth)) {
            emit(Emits.UPDATE_WIDTH, newWidth);
            prevWidth = newWidth;
          }
          break;
      }
    };

    const onDragEnd = ({ dir }: PaneEmittedData): void => {
      emit(Emits.DRAG_END, dir);
    };

    return {
      refRoot,
      onDragStart,
      onDragMove,
      onDragEnd,
      panes,
      PaneDirections,
      Emits,
    };
  },
  emits: {
    [Emits.FOCUS]: (_data: { state: boolean; direction: string }) => void {},
    [Emits.UPDATE_WIDTH]: (_width: number) => void {},
    [Emits.UPDATE_HEIGHT]: (_height: number) => void {},
    [Emits.DRAG_START]: (_dir: string) => void {},
    [Emits.DRAG_MOVE]: (_dir: string) => void {},
    [Emits.DRAG_END]: (_dir: string) => void {},
  },
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
      type: String as PropType<PaneDirectionKey | string>,
      default: "",
    },
    alwaysShowKnob: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object as PropType<BBResizeOptions>,
      default: {
        pane: {
          knob: {
            constantlyShow: false,
          },
        },
      },
    },
    styles: {
      type: Object as PropType<BBResizeStyles>,
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
.bb-resize {
  position: relative;
  display: flex;
}
</style>
