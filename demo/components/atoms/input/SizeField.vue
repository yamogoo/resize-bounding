<template>
  <div class="ui-size-field">
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
}

defineProps<Props>();
</script>

<style lang="scss">
.ui {
  &-size-field {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 32px;
    // @include use-themed-border(all);
    @include use-border-radius(--lg);
    @include themify($app-themes) {
      color: themed("text", "primary");
      background: themed("background", "inactive");
    }

    .ui-prop-field {
      &:not(:last-child) {
        @include use-themed-border(right);
      }
    }
  }
}
</style>
