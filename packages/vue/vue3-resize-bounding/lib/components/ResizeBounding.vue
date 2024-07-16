<template>
  <div
    ref="refRoot"
    data-testid="resize-bounding-container"
    :class="[classNames.container, { disabled }]"
    :style="[computedStyle]"
  >
    <slot></slot>
    <template v-for="{ show, direction } in panes" :key="direction">
      <ResizeBoundingPane
        v-if="!disabled && show"
        :prefix="options.prefix ?? ''"
        :direction="direction"
        :options="options"
        :styles
        :classNames
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
      </ResizeBoundingPane>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type ComputedRef, type HTMLAttributes } from "vue";
import deepmerge from "deepmerge";

import { type Props, Emits } from "./ResizeBounding";
import { PaneDirections, PaneDirectionAliases } from "../shared/typings";

import ResizeBoundingPane, {
  type PaneEmittedData,
} from "./ResizeBoundingPane.vue";

import {
  defaultOptions,
  getClassNames,
  PREFIX,
} from "./ResizeBounding.classNames";

const props = withDefaults(defineProps<Props>(), {
  minWidth: 0,
  minHeight: 0,
});

const emits = defineEmits<{
  (e: Emits.UPDATE_WIDTH, width: number): void;
  (e: Emits.UPDATE_HEIGHT, height: number): void;
  (e: Emits.DRAG_START, dir: string): void;
  (e: Emits.DRAG_MOVE, dir: string): void;
  (e: Emits.DRAG_END, dir: string): void;
  (e: Emits.FOCUS, data: { state: boolean; direction: string }): void;
}>();

const refRoot = ref<HTMLDivElement | null>(null);

let { width: newWidth, height: newHeight } = props;
let prevWidth = newWidth,
  prevHeight = newHeight;

const options = computed(() => {
  return deepmerge(defaultOptions, props.options ?? {});
});

const classNames = getClassNames(
  props.styles ?? {},
  options.value.prefix ?? PREFIX,
);

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
    ...(props.width && _width),
    ...(props.height && _height),
  };
});

const getDirectionAlias = (d: PaneDirections): PaneDirectionAliases => {
  if (d === PaneDirections.LEFT || d === PaneDirections.RIGHT)
    return PaneDirectionAliases.HORIZONTAL;
  return PaneDirectionAliases.VERTICAL;
};

const panes = computed(() => {
  const directions = props.directions ?? "";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.entries(PaneDirections).map(([_, v]) => {
    return {
      show:
        RegExp(v).test(directions) ||
        RegExp(getDirectionAlias(v)).test(directions),
      direction: v,
    };
  });
});

let startWidth = props.width ?? 0,
  startHeight = props.height ?? 0;

let startX = 0,
  startY = 0;

const onDragStart = ({ x, y, dir }: PaneEmittedData): void => {
  startWidth = props.width ?? 0;
  startHeight = props.height ?? 0;

  startX = x;
  startY = y;

  emits(Emits.DRAG_START, dir);
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

  emits(Emits.DRAG_MOVE, dir);

  if (dir === PaneDirections.LEFT) {
    newWidth = startWidth + (startX - x);
    if (prevWidth === newWidth) return;

    const truncated = truncateInRange(props.minWidth, props.maxWidth, newWidth);
    emits(Emits.UPDATE_WIDTH, truncated);
    prevWidth = truncated;
  } else if (dir === PaneDirections.RIGHT) {
    newWidth = startWidth + (x - startX);

    if (prevWidth === newWidth) return;

    const truncated = truncateInRange(props.minWidth, props.maxWidth, newWidth);
    emits(Emits.UPDATE_WIDTH, truncated);
    prevWidth = truncated;
  } else if (dir === PaneDirections.TOP) {
    newHeight = startHeight + (startY - y);

    if (prevHeight === newHeight) return;

    const truncated = truncateInRange(
      props.minHeight,
      props.maxHeight,
      newHeight,
    );

    emits(Emits.UPDATE_HEIGHT, truncated);
    prevHeight = truncated;
  } else if (dir === PaneDirections.BOTTOM) {
    newHeight = startHeight + (y - startY);

    if (prevHeight === newHeight) return;

    const truncated = truncateInRange(
      props.minHeight,
      props.maxHeight,
      newHeight,
    );

    emits(Emits.UPDATE_HEIGHT, truncated);
    prevHeight = truncated;
  }
};

const onDragEnd = ({ dir }: PaneEmittedData): void => {
  emits(Emits.DRAG_END, dir);
};
</script>
