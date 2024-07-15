<template>
  <ResizeBounding
    :options="{
      knob: {
        show: true,
      },
    }"
  >
    <slot></slot>
  </ResizeBounding>
</template>

<script setup lang="ts">
import ResizeBounding from "vue3-resize-bounding";
</script>
