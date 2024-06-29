<template>
  <div class="bb-resize-app__h-size-field">
    <HInput
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
import HInput from "./HInput.vue";

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
.bb-resize-app {
  &__h-size-field {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 40px;
    background-color: white;
    border-radius: 24px;
    color: black;

    .bb-resize-app__h-input {
      &:not(:last-child) {
        border-right: 1px solid rgba(0, 0, 0, 0.5);
      }
    }

    input {
      width: 44px;
    }
  }
}
</style>
