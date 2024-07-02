<template>
  <div :class="['ui-input', { disabled }]">
    <label class="ui-input__label" v-if="label">{{ label }}</label>
    <input
      v-if="!disabled"
      type="number"
      :value
      @change="
        (e) =>
          $emit('update:value', strToNum((e.target as HTMLInputElement).value))
      "
    />
    <span v-else>--</span>
  </div>
</template>

<script setup lang="ts">
import { strToNum } from "./utils";

interface Props {
  value: number;
  disabled?: boolean;
  label?: string;
}

withDefaults(defineProps<Props>(), {
  value: 0,
  disabled: false,
});

defineEmits<{
  (e: "update:value", value: number): void;
}>();
</script>

<style lang="scss">
.ui {
  &-input {
    display: flex;
    flex-direction: row;
    gap: 6px;
    padding: 0px 12px;
    color: inherit;

    &__label,
    input,
    span {
      font-size: 14px;
      letter-spacing: 0.3px;
      align-self: center;
      color: inherit;
    }

    input,
    span {
      @include box(100%);
      background: none;
      border: none;
      outline: none;
    }

    span {
      height: max-content;
    }

    &.disabled {
      opacity: 0.5;
    }
  }
}
</style>
