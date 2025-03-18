<script setup lang="ts">
import CopyButton from "@/components/controls/CopyButton.vue";

const emits = defineEmits<{
  (e: "copy"): void;
}>();
</script>

<template>
  <div class="ui-boxed-link">
    <div class="ui-boxed-link--container">
      <slot></slot>
    </div>
    <CopyButton class="ui-boxed-link__icon" @click="() => emits('copy')" />
  </div>
</template>

<style lang="scss">
.ui {
  &-boxed-link {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    @include padding(top bottom, 32px);
    padding-left: 20px;
    padding-right: 50px;
    text-align: center;

    &:not(:last-child) {
      @include use-themed-border(bottom);
    }

    &--container {
      @include themify($themes) {
        color: themed("label", "secondary");
      }
    }

    &__icon {
      position: absolute;
      right: 20px;
      cursor: pointer;
      z-index: 1;
    }
  }
}
</style>
