<script setup lang="ts">
import BaseLink from "./BaseLink.vue";

const props = defineProps<Props>();
</script>

<script lang="ts">
export interface Props {
  to?: string;
  name?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}
</script>

<template>
  <div class="documentation-link">
    <BaseLink
      v-bind="props"
      :target
      :icon-name="'storybook-logo'"
      :size="'sm'"
      :orientation="'horizontal'"
      :name="name"
    ></BaseLink>
  </div>
</template>

<style lang="scss">
@use "sass:map";

.documentation-link {
  display: flex;
  padding: 0 px2rem(map.get($spacing, "sm")) 0 px2rem(map.get($spacing, "xxs"));
  border-radius: px2rem(map.get($roundness, "sm"));

  @include themify($themes) {
    background-color: themed("background", "primary");
  }

  @extend %base-transition;

  .ui-link {
    gap: 0;
  }
}
</style>
