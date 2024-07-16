<template>
  <ResizeBounding
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

<script setup lang="ts">
import { ref } from "vue";

import ResizeBounding, {
  globalClassNames,
  PREFIX,
  type IStyles,
} from "vue3-resize-bounding";

import { colors } from "@/components/colors";

const styles = ref<Partial<IStyles>>({
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
});
</script>
