<template>
  <div
    v-bind="$attrs"
    ref="refRoot"
    data-testid="boundarize-container"
    :class="[`${options.prefix}-${styles.container?.class}`]"
    :style="[computedStyle, styles?.container?.style]"
  >
    <slot :width :height></slot>
    <template v-for="({ show, direction }, idx) in panes" :key="idx">
      <BoundarizePane
        v-if="!disabled && show"
        :prefix="options.prefix ?? ''"
        :direction="direction"
        :options="options.pane"
        :styles="defaultStyles.pane"
        @focus="
          (isFocused) => {
            $emit(Emits.FOCUS, { state: isFocused, direction });
          }
        "
        @drag:start="onDragStart"
        @drag:move="onDragMove"
        @drag:end="onDragEnd"
      >
        <template #default>
          <slot name="knob"></slot>
        </template>
      </BoundarizePane>
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

import deepmerge from "deepmerge";

import type { BBResize } from "../shared/typings";

import BoundarizePane, {
  PaneDirectionAliases,
  PaneDirections,
  type PaneDirectionKey,
  type PaneEmittedData,
} from "./BoundarizePane.vue";

export enum Emits {
  FOCUS = "focus",
  UPDATE_WIDTH = "update:width",
  UPDATE_HEIGHT = "update:height",
  DRAG_START = "drag:start",
  DRAG_MOVE = "drag:move",
  DRAG_END = "drag:end",
}

export const defaultOptions: BBResize.Options = {
  prefix: "boundarize",
  pane: {
    width: 4,
    position: "central",
    knob: {
      show: false,
      constantlyShow: false,
    },
    showBorder: false,
    cursor: {
      horizontal: "col-resize",
      vertical: "row-resize",
    },
  },
};

export const defaultStyles: BBResize.Styles = {
  container: {
    class: "container",
    style: undefined,
  },
  pane: {
    class: "pane",
    style: {
      position: "absolute",
      display: "block",
      zIndex: 9999,
    },
    splitter: {
      class: "splitter",
      style: {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "none",
        transition: `background, height 125ms ease-out`,
        zIndex: 9999,
      },
      focused: {
        class: "active",
        style: { background: "blue" },
      },
    },
    knob: {
      class: "knob",
      style: {
        width: "64px",
        minWidth: "64px",
        height: "6px",
        background: "gray",
        borderRadius: "8px",
        transition: `background, height 125ms ease-out`,
      },
      focused: {
        class: "active",
        style: { background: "none" },
      },
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
      return deepmerge(defaultOptions, props.options);
    });

    const styles: ComputedRef<BBResize.Styles> = computed(() => {
      return deepmerge(defaultStyles, props.styles) as BBResize.Styles;
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
      defaultStyles,
      options,
      styles,
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
    width: Number,
    height: Number,
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
      default: {},
    },
  },
  name: "Boundarize",
  components: { BoundarizePane },
});
</script>
