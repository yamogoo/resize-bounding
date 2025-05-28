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
@use "../assets/scss/utils.scss" as *;

.story-values-container {
  padding-bottom: px2rem(32px);
}
</style>
