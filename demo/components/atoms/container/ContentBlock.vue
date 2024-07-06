<template>
  <div class="ui-content-block">
    <div class="ui-content-block--container">
      <div class="ui-content-block__control-panel">
        <slot name="header"></slot>
      </div>
      <slot></slot>
      <div
        v-if="imagePath"
        class="ui-content-block--cover"
        :style="[
          {
            backgroundImage: `url(${imagePath})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          },
        ]"
      ></div>
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
  imageDescription: "image",
});
</script>

<style lang="scss">
.ui-content-block {
  position: relative;
  @include box(100%);
  padding: 12px;

  &--container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @include box(100%);
    border-radius: 16px;
    background-color: white;
    overflow: hidden;
  }

  &__control-panel {
    position: absolute;
    top: 20px;
  }

  h1 {
    font-size: 44px;
    font-weight: 600;
    color: black;
  }
}
</style>
