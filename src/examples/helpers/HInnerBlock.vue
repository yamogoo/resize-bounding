<template>
  <div class="h-inner-block">
    <div
      class="h-inner-block--container"
      :style="`background-image: url(${imagePath}); background-position: center; background-size: cover;`"
    >
      <h1>Vue3 Resize Bounding</h1>
      <h3>Supports Mouse and Touch Events</h3>
      <p>
        is a versatile and user-friendly component for Vue 3 that enables
        intuitive resizing of inner user components via draggable boundary
        panes.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  imagePath?: string;
  imageDescription?: string;
}

withDefaults(defineProps<Props>(), {
  imagePath: "./$a.shape.svg",
  imageDescription: "image",
});
</script>

<style lang="scss">
.h-inner-block {
  position: relative;
  @include box(100%);
  padding: 12px;
  overflow: hidden;

  &--container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @include box(100%);
    border-radius: 16px;
    padding: 40px;
  }

  * {
    color: white;
  }

  h1 {
    font-size: 76px;
    font-weight: 600;
  }

  p {
    font-size: 21px;
    font-weight: 400;
    line-height: 1.5;
  }
}
</style>
