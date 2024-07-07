<template>
  <div class="ui-main-addition-guide">
    <h3 class="ui-main-addition-guide__title">{{ title }}</h3>
    <AtomsLinkBasic
      :size="'lg'"
      :icon-name="'figma-logo'"
      :to="'/'"
      :name="'figma'"
      filled
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
}

withDefaults(defineProps<Props>(), {
  title: "Widget for Figma",
});
</script>

<script lang="ts">
export interface LinkData {
  name: string;
  url?: string;
}
</script>

<style lang="scss">
.ui {
  &-main-addition-guide {
    display: flex;
    @include flex-col(center);
    gap: 10px;
    @include box(100%);

    .ui-main-addition-guide__title {
      @extend %title--xs;
      text-align: center;
    }

    .ui-boxed-link {
      @extend %code-font;
      @include use-font-size(--sm);
    }
  }
}
</style>
