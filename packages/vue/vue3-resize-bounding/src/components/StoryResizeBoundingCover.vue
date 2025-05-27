<script lang="ts" setup>
import StoryCoverMainLogo from "./StoryCoverMainLogo.vue";
</script>

<template>
  <div class="resize-bounding-cover">
    <div class="resize-bounding-cover__container">
      <StoryCoverMainLogo></StoryCoverMainLogo>
    </div>
  </div>
</template>

<style lang="scss">
@use "../assets/scss/colors.scss" as *;

.resize-bounding-cover {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 1rem;
  overflow: hidden;

  &__container {
    width: 100%;
    height: 100%;
    border: 1px solid $border;
    border-radius: 0.5rem;
  }
}
</style>
