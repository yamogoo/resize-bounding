<template>
  <Vue3BbResize
    v-bind="$attrs"
    :options="{
      pane: {
        width: 12,
        knob: {
          constantlyShow: true,
        },
        cursor: {
          vertical: 'ew-resize',
        },
      },
    }"
    :styles="{
      knob: {
        background: 'green',
      },
    }"
  >
    <slot></slot>
  </Vue3BbResize>
</template>

<script setup lang="ts">
import Vue3BbResize from "@/components/Vue3BbResize.vue";
</script>
