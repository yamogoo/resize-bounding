<template>
  <Vue3BbResize
    v-bind="$attrs"
    :options="{
      prefix: 'my-bb-resize',
      pane: {
        width: 12,
        knob: {
          constantlyShow: true,
        },
        cursor: {
          vertical: 'grab',
        },
      },
    }"
    :styles="{
      pane: {
        knob: {
          class: 'my-knob',
          style: { background: 'green' },
        },
      },
    }"
  >
    <slot></slot>
  </Vue3BbResize>
</template>

<script setup lang="ts">
import Vue3BbResize from "@/components/Vue3BbResize.vue";
</script>
