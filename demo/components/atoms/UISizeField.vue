<template>
  <div class="ui-size-field">
    <UIInput
      label="W:"
      :value="width"
      :disabled="width === undefined"
      @update:value="
        (width) => {
          $emit('update:width', width);
        }
      "
    />
    <UIInput
      label="H:"
      :value="height"
      :disabled="height === undefined"
      @update:value="
        (height) => {
          $emit('update:height', height);
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
import UIInput from "./UIInput.vue";

interface Props {
  width?: number;
  height?: number;
  label?: string;
}

defineProps<Props>();

defineEmits<{
  (e: "update:width", value: number): void;
  (e: "update:height", value: number): void;
}>();
</script>

<style lang="scss">
$__background--primary: #e8ebec;

.ui {
  &-size-field {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 36px;
    background-color: $__background--primary;
    border-radius: 24px;
    color: black;

    .ui-input {
      &:not(:last-child) {
        border-right: 1px solid rgba(0, 0, 0, 0.2);
      }
    }

    input {
      width: 44px;
    }
  }
}
</style>
