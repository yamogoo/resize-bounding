<template>
  <div :class="['ui-size-field', transparent ? 'transparent' : 'filled']">
    <PropField
      label="w:"
      :value="width"
      unit="px"
      :disabled="width === undefined"
    />
    <PropField
      label="h:"
      :value="height"
      unit="px"
      :disabled="height === undefined"
    />
  </div>
</template>

<script setup lang="ts">
import PropField from "./PropField.vue";

interface Props {
  width?: number;
  height?: number;
  label?: string;
  transparent?: boolean;
}

withDefaults(defineProps<Props>(), {
  transparent: false,
});
</script>

<style lang="scss">
.ui {
  &-size-field {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 32px;
    // @include use-themed-border(all);
    @include use-border-radius(--lg);
    @extend %transition;

    &.filled {
      @include themify($app-themes) {
        color: transparentize(themed("text", "secondary"), 0.25);
        background: themed("background", "inactive");
      }

      .ui-prop-field {
        &:not(:last-child) {
          @include use-themed-border(right);
        }
      }
    }

    &.transparent {
      @include themify($app-themes) {
        color: transparentize($c-white, 0.2);
        background: transparentize(themed("background", "inactive"), 0.7);
        backdrop-filter: blur(12px);
      }

      .ui-prop-field {
        &:not(:last-child) {
          @include use-border(right, transparentize($c-white, 0.85));
        }
      }
    }
  }
}
</style>
