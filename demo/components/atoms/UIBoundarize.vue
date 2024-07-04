<template>
  <Boundarize
    v-bind="$attrs"
    :options="{
      prefix: 'my-bb-resize',
      pane: {
        width: 4,
        knob: {
          show: true,
          constantlyShow: true,
        },
      },
    }"
    :styles="{
      pane: {
        splitter: {
          focused: {
            style: { background: 'green' },
          },
        },
        knob: {
          class: 'my-knob',
          focused: { style: { background: 'none' } },
        },
      },
    }"
  >
    <slot></slot>
  </Boundarize>
</template>

<script setup lang="ts">
import Boundarize from "vue3-boundarize";
</script>
