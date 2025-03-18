<script setup lang="ts">
import HInput from "./UIInput.vue";

import colors from "@/tokens.json";

interface Props {
  width?: number;
  height?: number;
  label?: string;
}

defineProps<Props>();

defineEmits<{
  (e: "update:width", width: number): void;
  (e: "update:height", height: number): void;
}>();
</script>

<template>
  <div
    class="ui-size-field"
    :style="{
      backgroundColor: colors.backgroundSecondary,
      color: colors.foregroundSecondary,
    }"
  >
    <HInput
      data-testid="input-width"
      label="W:"
      :value="width"
      :disabled="width === undefined"
      @update:value="
        (width) => {
          $emit('update:width', width);
        }
      "
    />
    <HInput
      data-testid="input-height"
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

<style lang="scss">
.ui {
  &-size-field {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 36px;
    border-radius: 24px;

    .ui-input {
      &:not(:last-child) {
        border-right: 1px solid #ffffff33;
      }
    }

    input {
      width: 44px;
    }
  }
}
</style>
