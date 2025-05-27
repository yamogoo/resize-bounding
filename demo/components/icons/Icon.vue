<script setup lang="ts">
import tokens from "@/tokens";

import BaseSkeleton from "@/components/skeleton/BaseSkeleton.vue";

withDefaults(defineProps<Props>(), {
  size: "md",
});
</script>

<script lang="ts">
export type SymbolName =
  | "computerMouse_fill_200"
  | "gestureTap_fill_200"
  | "figma-logo"
  | "github-logo"
  | "vue-logo"
  | "copy_outline_300"
  | "storybook-logo"
  | "git";

export type SymbolColor =
  | "primary"
  | "primary-inversed"
  | "secondary"
  | "secondary-inversed"
  | "accent"
  | "disabled";

export type SymbolSize = keyof typeof tokens.icon;

export interface Props {
  name: SymbolName;
  size?: SymbolSize;
  color?: SymbolColor;
}
</script>

<template>
  <div
    class="icon"
    data-testid="icon"
    :class="[{ [`icon_${size}`]: size, [`icon_${color}`]: color }]"
  >
    <Suspense>
      <NuxtIcon :name></NuxtIcon>
      <template #fallback>
        <BaseSkeleton />
      </template>
    </Suspense>
  </div>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineIconSizes($map: $icon) {
  @each $size, $val in $map {
    &_#{$size} {
      @include box(px2rem(map.get($val, "size")));
    }
  }
}

.icon {
  @include box(auto, inherit);
  line-height: 0;

  .nuxt-icon {
    @include box(100% !important);
  }

  svg {
    @include box(100% !important);
    fill: inherit;

    path {
      fill: inherit;
    }
  }

  .skeleton {
    @include box(100%);
  }

  /* * * Sizes * * */

  @include defineIconSizes();

  /* * * Colors * * */

  &_primary {
    @include themify($themes) {
      fill: themed("label", "primary");
    }
  }

  &_primary-inversed {
    @include themify($themes) {
      fill: themed("label", "primaryInversed");
    }
  }

  &_secondary {
    @include themify($themes) {
      fill: themed("label", "secondary");
    }
  }

  &_secondary-inversed {
    @include themify($themes) {
      fill: themed("label", "secondaryInversed");
    }
  }

  &_disabled {
    @include themify($themes) {
      fill: themed("label", "disabled");
    }
  }
}
</style>
