<script setup lang="ts">
import ResizeBounding, {
  globalClassNames,
  PREFIX,
  type IStyles,
} from "vue3-resize-bounding";

import colors from "@/tokens.json";

const styles: Partial<IStyles> = {
  splitter: [
    globalClassNames(PREFIX).splitter,
    {
      [`.${globalClassNames(PREFIX).pane}.active &`]: {
        background: `${colors.accent}`,
      },
    },
  ],
  knob: [
    globalClassNames(PREFIX).knob,
    {
      height: "10px",
      borderRadius: "5px",
      background: `${colors.resizerKnobNormal}`,
      border: `2px solid ${colors.backgroundSecondary}`,
      [`.${globalClassNames(PREFIX).pane}.active &`]: {
        background: `${colors.accent}`,
      },
    },
  ],
};
</script>

<script lang="ts">
import { type Props as ResizeBoundingProps } from "vue3-resize-bounding";

export type Props = Partial<ResizeBoundingProps>;
</script>

<template>
  <ResizeBounding
    data-testid="'resize-bounding'"
    :options="{
      width: 6,
      activeAreaWidth: 16,
      knob: {
        show: true,
      },
    }"
    :styles
  >
    <slot></slot>
  </ResizeBounding>
</template>
