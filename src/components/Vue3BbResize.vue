<template>
  <div
    v-bind="$attrs"
    ref="refRoot"
    data-testid="bb-resize-container"
    :class="options.prefix"
    :style="[computedStyle, styles?.container]"
  >
    <slot :width :height></slot>
    <template v-for="({ show, direction }, idx) in panes" :key="idx">
      <Vue3BbResizePane
        v-if="!disabled && show"
        :prefix="options.prefix ?? ''"
        :direction="direction"
        :options="options.pane"
        :styles
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
import {
  ref,
  computed,
  defineComponent,
  type PropType,
  type ComputedRef,
  type HTMLAttributes,
} from "vue";

import { deepMerge } from "./utils";

import type { BBResize } from "./typings";

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

const defaultOptions: BBResize.Options = {
  prefix: "bb-resize",
  pane: {
    width: 12,
    position: "internal",
    knob: {
      constantlyShow: true,
    },
  },
};

export default defineComponent({
  setup(props, { emit }) {
    const refRoot = ref<HTMLDivElement | null>(null);

    let { width: newWidth, height: newHeight } = props;
    let prevWidth = newWidth,
      prevHeight = newHeight;

    const computedStyle: ComputedRef<HTMLAttributes["style"]> = computed(() => {
      const _width = {
        width: `${props.width}px`,
        minWidth: `${props.width}px`,
      };

      const _height = {
        height: `${props.height}px`,
        minHeight: `${props.height}px`,
      };

      return {
        position: "relative",
        ...(props.width && _width),
        ...(props.height && _height),
      };
    });

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

    const options = computed(() => {
      return deepMerge(defaultOptions, props.options);
    });

    const onDragStart = ({ x, y, dir }: PaneEmittedData): void => {
      startWidth = props.width ?? 0;
      startHeight = props.height ?? 0;

      startX = x;
      startY = y;

      emit(Emits.DRAG_START, dir);
    };

    const truncateInRange = (
      min: number,
      max: number | undefined,
      next: number,
    ): number => {
      const _max = max ?? Number.POSITIVE_INFINITY;

      if (next <= min) return min;
      else if (next >= _max) return _max;

      return next;
    };

    const onDragMove = ({ x, y, dir }: PaneEmittedData): void => {
      if (!refRoot.value) return;

      emit(Emits.DRAG_MOVE, dir);

      if (dir === PaneDirections.LEFT) {
        newWidth = startWidth + (startX - x);

        if (prevWidth === newWidth) return;

        const truncated = truncateInRange(
          props.minWidth,
          props.maxWidth,
          newWidth,
        );

        emit(Emits.UPDATE_WIDTH, truncated);
        prevWidth = truncated;
      } else if (dir === PaneDirections.RIGHT) {
        newWidth = startWidth + (x - startX);

        if (prevWidth === newWidth) return;

        const truncated = truncateInRange(
          props.minWidth,
          props.maxWidth,
          newWidth,
        );

        emit(Emits.UPDATE_WIDTH, truncated);
        prevWidth = truncated;
      } else if (dir === PaneDirections.TOP) {
        newHeight = startHeight + (startY - y);

        if (prevHeight === newHeight) return;

        const truncated = truncateInRange(
          props.minHeight,
          props.maxHeight,
          newHeight,
        );

        emit(Emits.UPDATE_HEIGHT, truncated);
        prevHeight = truncated;
      } else if (dir === PaneDirections.BOTTOM) {
        newHeight = startHeight + (y - startY);

        if (prevHeight === newHeight) return;

        const truncated = truncateInRange(
          props.minHeight,
          props.maxHeight,
          newHeight,
        );

        emit(Emits.UPDATE_HEIGHT, truncated);
        prevHeight = truncated;
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
      truncateInRange,
      computedStyle,
      options,
      panes,
      PaneDirections,
      Emits,
    };
  },
  inheritAttrs: true,
  emits: {
    [Emits.FOCUS]: (data: { state: boolean; direction: string }) =>
      typeof data === "object" &&
      "state" in data &&
      typeof data.state === "boolean" &&
      "direction" in data &&
      typeof data.direction === "string",
    [Emits.UPDATE_WIDTH]: (width: number) => typeof width === "number",
    [Emits.UPDATE_HEIGHT]: (height: number) => typeof height === "number",
    [Emits.DRAG_START]: (dir: string) => typeof dir === "string",
    [Emits.DRAG_MOVE]: (dir: string) => typeof dir === "string",
    [Emits.DRAG_END]: (dir: string) => typeof dir === "string",
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
      default: `${PaneDirectionAliases.HORIZONTAL}${PaneDirectionAliases.VERTICAL}`,
    },
    alwaysShowKnob: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object as PropType<Partial<BBResize.Options>>,
      default: {},
    },
    styles: {
      type: Object as PropType<Partial<BBResize.Styles>>,
    },
  },
  name: "Vue3BbResize",
  components: { Vue3BbResizePane },
});
</script>
