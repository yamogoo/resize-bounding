<script setup lang="ts">
defineProps<Props>();
</script>

<script lang="ts">
export interface Props {
  label: string;
  value: string;
}
</script>

<template>
  <div class="ui-badge" data-testid="ui-badge">
    <span class="ui-badge__label" data-testid="ui-badge-label">{{
      label
    }}</span>
    <span class="ui-badge__value" data-testid="ui-badge-value">{{
      value
    }}</span>
  </div>
</template>

<style lang="scss">
@use "../assets/scss/utils.scss" as *;
@use "../assets/scss/colors.scss" as *;
@use "../assets/scss/typography.scss" as *;

.ui {
  &-badge {
    display: flex;
    flex-direction: row;
    max-width: max-content;
    overflow: hidden;
    border-radius: px2rem(4px);
    border: 1px solid $border;

    &__label,
    &__value {
      display: block;
      font-family: $font-family;
      padding: px2rem(6px) px2rem(16px);
    }

    &__label {
      color: $label-secondary;
    }

    &__value {
      color: $label-secondary;
      background-color: $border;
    }
  }
}
</style>
