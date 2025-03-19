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
@use "sass:map";

.ui {
  &-badge {
    display: flex;
    flex-direction: row;
    max-width: max-content;
    overflow: hidden;
    border-radius: map.get($roundness, "xs");

    @include themify($themes) {
      border: 1px solid themed("border", "inactive");
    }
    @extend %base-transition;

    &__label,
    &__value {
      display: block;
      padding: 6px 16px;
      @extend %t__caption__1;
    }

    &__label {
      @include themify($themes) {
        color: themed("label", "secondary");
      }
      @extend %base-transition;
    }

    &__value {
      @include themify($themes) {
        color: themed("label", "secondary");
        background: themed("border", "inactive");
      }
      @extend %base-transition;
    }
  }
}
</style>
