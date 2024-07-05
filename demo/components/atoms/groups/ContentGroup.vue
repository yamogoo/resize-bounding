<template>
  <div
    :class="[`ui-content-group --${direction} --${alignment}`]"
    data-testid="ui-content-group"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  direction?: "h" | "v";
  alignment?: "start" | "center" | "end";
}

withDefaults(defineProps<Props>(), {
  direction: "h",
  alignment: "start",
});
</script>

<style lang="scss">
[class^="ui-content-group"] {
  display: flex;
  gap: 20px;
}

.ui-content-group {
  &.--h {
    &.--start {
      flex-direction: row;
    }

    &.--center {
      flex-direction: row;
      justify-content: center;
    }

    &.--end {
      flex-direction: row-reverse;
    }
  }

  &.--v {
    &.--start {
      flex-direction: column;
    }

    &.--center {
      flex-direction: column;
      align-items: center;
    }

    &.--end {
      flex-direction: column-reverse;
    }
  }
}
</style>
