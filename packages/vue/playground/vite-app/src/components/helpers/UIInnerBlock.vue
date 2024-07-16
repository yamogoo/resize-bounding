<template>
  <div class="ui-inner-block">
    <div
      class="ui-inner-block--container"
      :style="[
        {
          backgroundImage: `url(${imagePath})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundColor: colors.backgroundPrimary,
        },
      ]"
    >
      <div class="ui-inner-block__control-panel">
        <slot></slot>
      </div>
      <h1 :style="{ color: colors.foregroundPrimary }">{{ title }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { colors } from "@/components/colors";

interface Props {
  title?: string;
  imagePath?: string;
}

defineProps<Props>();
</script>

<style lang="scss">
.ui-inner-block {
  position: relative;
  @include box(100%);
  padding: 12px;
  overflow: hidden;

  &--container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @include box(100%);
    border-radius: 16px;
    padding: 40px;
  }

  &__control-panel {
    position: absolute;
    top: 20px;
  }

  h1 {
    font-size: 64px;
    font-weight: 500;
  }
}
</style>
