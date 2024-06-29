<template>
  <div class="h-inner-block">
    <div
      class="h-inner-block--container"
      :style="[
        {
          backgroundImage: `url(${imagePath})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        },
      ]"
    >
      <div class="h-inner-block__control-panel">
        <slot></slot>
      </div>
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
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

  &__control-panel {
    position: absolute;
    top: 20px;
  }

  h1 {
    font-size: 44px;
    font-weight: 600;
    color: white;
  }
}
</style>
