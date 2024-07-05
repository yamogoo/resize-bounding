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

<script setup lang="ts">
defineProps<Props>();
</script>

<script lang="ts">
export interface Props {
  label: string;
  value: string;
}
</script>

<style lang="scss">
.ui {
  &-badge {
    display: flex;
    flex-direction: row;
    @include use-border-radius(--sm);
    overflow: hidden;

    @include themify($app-themes) {
      border: 1px solid themed("colors", "accent");
    }

    &__label,
    &__value {
      display: block;
      padding: 6px 16px;
      @include use-font-size(--sm);
    }

    &__label {
      @include themify($app-themes) {
        color: themed("text", "primary");
      }
    }

    &__value {
      @include themify($app-themes) {
        color: themed("text", "primary--invert");
        background: themed("colors", "accent");
      }
    }
  }
}
</style>
