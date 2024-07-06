<template>
  <div class="ui-rounded-container">
    <div class="ui-rounded-container--container">
      <div class="ui-rounded-container__control-panel">
        <slot name="header"></slot>
      </div>
      <slot></slot>
      <div
        v-if="imagePath"
        class="ui-rounded-container--cover"
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
.ui-rounded-container {
  position: relative;
  @include box(100%);
  padding: 8px;
  overflow: hidden;

  &--container {
    display: flex;
    @include flex-col(center);
    @include box(100%);
    @extend %border-radius--lg;
    @include themify($app-themes) {
      background: themed("background", "primary");
    }
    @include use-themed-border(all, "secondary");
    overflow: hidden;
  }

  &__control-panel {
    position: absolute;
    top: 20px;
  }
}
</style>
