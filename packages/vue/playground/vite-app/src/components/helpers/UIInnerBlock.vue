<template>
  <div class="ui-inner-block">
    <div
      class="ui-inner-block--container"
      :style="[
        {
          backgroundImage: `url(${imagePath})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        },
      ]"
    >
      <div class="ui-inner-block__control-panel">
        <slot></slot>
      </div>
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
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
    background-color: white;
  }

  &__control-panel {
    position: absolute;
    top: 20px;
  }

  h1 {
    font-size: 44px;
    font-weight: 600;
    color: black;
  }
}
</style>
