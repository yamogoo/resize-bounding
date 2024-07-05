<template>
  <div class="ui-boxed-link">
    <div class="ui-boxed-link--container"><slot></slot></div>
    <NuxtIcon
      class="ui-boxed-link__icon"
      name="doc"
      @click="() => emits('copy')"
    />
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (e: "copy"): void;
}>();
</script>

<style lang="scss">
.ui {
  &-boxed-link {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    @include padding-v(32px);
    @include padding-h(20px, 50px);
    text-align: center;

    &:not(:last-child) {
      border-bottom: 1px solid lightgray;
    }

    // &--container {}

    &__icon {
      position: absolute;
      right: 20px;
      cursor: pointer;
      z-index: 1;

      @include themify($app-themes) {
        color: themed("colors", "accent");
      }

      svg {
        @include box(21px);
      }
    }
  }
}
</style>
