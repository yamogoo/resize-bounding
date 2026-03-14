<script setup lang="ts">
import { ref, useId, watch } from "vue";

import { strToNum } from "./utils";

interface Props {
  value?: number;
  disabled?: boolean;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  disabled: false,
});

const { value } = props;

const emit = defineEmits<{
  (e: "update:value", value: number): void;
}>();

const id = useId();

const localValue = ref(value);

watch(
  () => props.value,
  (updatedValue) => {
    localValue.value = updatedValue;
  }
);

const onUpdateValue = (e: Event) => {
  emit("update:value", strToNum((e.target as HTMLInputElement).value));
};
</script>

<template>
  <div :class="['ui-input', { 'ui-input_disabled': disabled }]">
    <label v-if="label" :for="id" class="ui-input__label">{{ label }}
      <input
        v-if="!disabled"
        :id
        type="number"
        :value="localValue ?? 0"
        @change="onUpdateValue"
      />
    </label>
    <span v-if="disabled">--</span>
  </div>
</template>

<style lang="scss">
.ui {
  &-input {
    display: flex;
    flex-direction: row;
    gap: 6px;
    padding: 0px 16px;
    color: inherit;

    &__label,
    input,
    span {
      font-size: 12px;
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

    &_disabled {
      opacity: 0.5;
    }
  }
}
</style>
