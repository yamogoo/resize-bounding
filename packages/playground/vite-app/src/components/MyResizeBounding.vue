<template>
  <div class="my-resizer">
    <MyResizeBounding v-bind="$attrs">
      <slot></slot>
    </MyResizeBounding>
  </div>
</template>

<script setup lang="ts">
import MyResizeBounding from "vue3-resize-bounding";
</script>
