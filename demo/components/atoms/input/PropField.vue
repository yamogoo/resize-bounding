<template>
  <div :class="['ui-prop-field', { disabled }]">
    <label class="ui-prop-field__label" v-if="label">{{ label }}</label>
    <span v-if="!disabled && value" class="ui-prop-field__value">{{
      value
    }}</span>
    <span v-else>---</span>
    <span v-if="unit" class="ui-prop-field__unit">{{ unit }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: number;
  disabled?: boolean;
  label?: string;
  unit?: string;
}

withDefaults(defineProps<Props>(), {
  value: 0,
  disabled: false,
});
</script>

<style lang="scss">
.ui {
  &-prop-field {
    display: flex;
    flex-direction: row;
    padding: 0px 12px;
    color: inherit;

    &__label {
      margin-right: 3px;
    }

    &__label,
    &__value,
    &__unit,
    span {
      @include use-font-size(--xxs);
      letter-spacing: 0.3px;
      align-self: center;
      color: inherit;
    }

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
