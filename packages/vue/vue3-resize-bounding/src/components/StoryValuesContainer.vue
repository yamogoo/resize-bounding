<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div class="story-values-container">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.story-values-container {
  padding-bottom: 32px;
}
</style>
