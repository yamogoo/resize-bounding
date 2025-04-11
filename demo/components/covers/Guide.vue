<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";

import { useConfigStore } from "@/stores/config";

import type { Theme } from "@/shared/types";

import Switch from "@/components/controls/Switch.vue";
import BaseLink from "@/components/controls/BaseLink.vue";
import BoxedLink from "@/components/controls/BoxedLink.vue";

interface Props {
  title?: string;
  links: Array<LinkData>;
}

withDefaults(defineProps<Props>(), {
  title: "Install",
});

const { currentTheme } = storeToRefs(useConfigStore());
const { setTheme } = useConfigStore();

const onCopy = (name: string | undefined): void => {
  if (name) navigator.clipboard.writeText(name);
};

const figmaUrl =
  "https://www.figma.com/community/file/1392603830584852243/resize-bounding";

const colorMode = computed({
  get() {
    return currentTheme.value === "light";
  },
  set(value: Theme) {
    setTheme(value);
    return value;
  },
});

const onChangeTheme = () => {
  colorMode.value = currentTheme.value === "light" ? "dark" : "light";
};
</script>

<script lang="ts">
export interface LinkData {
  name: string;
  url?: string;
}
</script>

<template>
  <div class="ui-main-guide">
    <div class="ui-main-guide__theme-switch">
      <Switch
        data-testid="theme-switch"
        :state="colorMode"
        aria-label="change-theme"
        @update:state="onChangeTheme"
      />
    </div>
    <h3 class="ui-main-guide__title">
      {{ title }}
    </h3>
    <BoxedLink
      v-for="({ url, name }, idx) in links"
      :key="idx"
      :src="url"
      @copy="onCopy(name)"
    >
      {{ name }}
    </BoxedLink>
    <BaseLink
      :orientation="'horizontal'"
      :size="'lg'"
      :icon-name="'figma-logo'"
      :to="figmaUrl"
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
    padding: px2rem(map.get($spacing, "xxl"));

    .ui-main-guide__title {
      @extend %t__body__1;
      margin: 0;
      padding: 0;
      text-align: center;

      @include themify($themes) {
        color: themed("label", "primary");
      }
    }

    &__theme-switch {
      position: absolute;
      top: px2rem(map.get($spacing, "md"));
      right: px2rem(map.get($spacing, "md"));
    }
  }
}
</style>
