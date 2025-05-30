<template>
  <div class="controls-header">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@use "sass:map";

.controls-header {
  $padding: px2rem(map.get($spacing, "md"));

  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: px2rem(map.get($spacing, "md"));
  padding: $padding;
}
</style>
