<script setup lang="ts">
import BaseLink from "@/components/controls/BaseLink.vue";
import BoxedLink from "@/components/controls/BoxedLink.vue";

withDefaults(defineProps<Props>(), {
  title: "Install",
});

const onCopy = (name: string | undefined): void => {
  if (name) navigator.clipboard.writeText(name);
};

const figmaUrl = import.meta.env.VITE_FIGMA_URL;
</script>

<script lang="ts">
export interface LinkData {
  name: string;
  url?: string;
}

export interface Props {
  title?: string;
  links: Array<LinkData>;
}
</script>

<template>
  <div class="ui-main-guide">
    <div class="ui-main-guide__controls">
      <slot name="controls"></slot>
    </div>
    <h3 class="ui-main-guide__title">
      {{ title }}
    </h3>
    <BoxedLink
      v-for="({ url, name }, idx) in links"
      :key="idx"
      data-testid="boxed-link"
      :src="url"
      @copy="onCopy(name)"
    >
      {{ name }}
    </BoxedLink>
    <BaseLink
      data-testid="figma-link"
      :orientation="'horizontal'"
      :size="'lg'"
      :icon-name="'figma-logo'"
      :to="figmaUrl"
      :target="'_blank'"
      :name="'ResizeBounding'"
      filled
    />
  </div>
</template>

<style lang="scss">
@use "sass:map";

.ui {
  &-main-guide {
    display: flex;
    @include flex-col(center);
    @include box(100%);

    @include respond-above("md") {
      padding: px2rem(map.get($spacing, "xxl"));
    }

    @include respond-below("md") {
      padding: px2rem(map.get($spacing, "sm"));
    }

    .ui-main-guide__title {
      @extend %t__body__1;
      margin: 0;
      padding: 0;
      text-align: center;

      @include themify($themes) {
        color: themed("label", "primary");
      }
    }

    &__controls {
      position: absolute;
      top: px2rem(map.get($spacing, "md"));
      right: px2rem(map.get($spacing, "md"));
    }
  }
}
</style>
