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
$__background--primary: #e8ebec;

.ui {
  &-size-field {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 32px;
    // background-color: $__background--primary;
    border: 1px solid $__background--primary;
    @include use-border-radius(--lg);
    color: black;

    .ui-prop-field {
      &:not(:last-child) {
        border-right: 1px solid $__background--primary;
      }
    }
  }
}
</style>
