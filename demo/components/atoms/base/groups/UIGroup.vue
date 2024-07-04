<template>
  <div :class="[`ui-group--${direction}`]" data-testid="ui-group">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  direction?: "h" | "v" | string;
}

withDefaults(defineProps<Props>(), {
  direction: "h",
});
</script>

<style lang="scss">
[class^="ui-group--"] {
  display: flex;
  gap: 20px;
}

.ui-group {
  &--h {
    flex-direction: row;
  }

  &--v {
    flex-direction: column;
  }
}
</style>
