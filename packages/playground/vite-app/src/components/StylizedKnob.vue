<template>
  <div class="my-resizer">
    <MyResizeBounding
      :width="480"
      :height="640"
      :styles="{
        splitter: {
          background: 'yellow',
        },
      }"
      :options="{
        knob: {
          show: true,
          normalHidden: true,
        },
      }"
    >
      <div
        :style="{ width: '100%', height: '100%', border: '1px solid gray' }"
      ></div>
      <template #knob>
        <p>my</p>
      </template>
    </MyResizeBounding>
  </div>
</template>

<script setup lang="ts">
import MyResizeBounding from "vue3-resize-bounding";
</script>
