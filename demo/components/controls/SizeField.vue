<script setup lang="ts">
interface Props {
  width?: number;
  height?: number;
}

defineProps<Props>();
</script>

<template>
  <div class="ui-size-field">
    <span class="ui-size-field__value"> {{ width ?? "0" }}px </span>
    <span class="ui-size-field__value"> {{ height ?? "0" }}px </span>
  </div>
</template>

<style lang="scss">
@use "sass:map";

.ui {
  &-size-field {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: map.get($gap, "xs");
    padding: map.get($spacing, "xxs") map.get($spacing, "xs");
    border-radius: map.get($roundness, "md");
    @extend %base-transition;

    @include themify($themes) {
      border: 1px solid themed("border", "primary");
    }

    &__value {
      @extend %t__caption__2;
      @include themify($themes) {
        color: themed("label", "inactive");
      }
      @extend %base-transition;
    }
  }
}
</style>
