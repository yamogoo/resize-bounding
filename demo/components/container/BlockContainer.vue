<script setup lang="ts">
import tokens from "@/tokens";

interface Props {
  size?: BlockContainerSize;
  title?: string;
  imagePath?: string;
  imageDescription?: string;
}

withDefaults(defineProps<Props>(), {
  size: "md",
  imageDescription: "image",
});
</script>

<script lang="ts">
export type BlockContainerSize = keyof typeof tokens.blockContainer;
</script>

<template>
  <div class="ui-block-container" :class="[size]">
    <div class="ui-block-container--container">
      <div class="ui-block-container__control-panel">
        <slot name="header"></slot>
      </div>
      <slot></slot>
      <div
        v-if="imagePath"
        class="ui-block-container--cover"
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

<style lang="scss">
@use "sass:map";

@mixin defineStyles($map: $blockContainer) {
  @each $size, $val in $map {
    $padding: px2rem(map.get($val, "padding"));
    $roundness: px2rem(map.get($val, "roundness"));

    & {
      &.#{$size} {
        padding: $padding;

        .ui-block-container--container {
          border-radius: $roundness;
        }
      }
    }
  }
}

.ui-block-container {
  position: relative;
  @include box(100%);
  overflow: hidden;

  @include defineStyles();

  &--container {
    display: flex;
    align-items: center;
    justify-content: center;
    @include box(100%);
    overflow: hidden;
    @extend %base-transition;

    @include themify($themes) {
      background: themed("background", "primary");
    }
    @include use-themed-border(all, "primary");
  }

  &__control-panel {
    position: absolute;
    top: px2rem(map.get($spacing, "md"));
    z-index: 1;
  }
}
</style>
