<script setup lang="ts">
import tokens from "@/tokens";

import type { UIElementColor, UIElementOrientation } from "@/shared/types";

import Icon, { type SymbolName } from "@/components/icons/Icon.vue";

withDefaults(defineProps<Props>(), {
  to: "/",
  size: "lg",
  color: "primary",
});
</script>

<script lang="ts">
export type BasicLinkSize = keyof typeof tokens.link;

export type BaseLinkColor = Extract<UIElementColor, "primary" | "accent">;

export type BaseLinkOrientation = UIElementOrientation | "none";

export interface Props {
  to?: string;
  name?: string;
  iconName?: SymbolName;
  orientation?: BaseLinkOrientation;
  color?: BaseLinkColor;
  size?: BasicLinkSize;
  filled?: boolean;
}
</script>

<template>
  <NuxtLink :to class="ui-link" :class="[size, color, orientation]">
    <Icon v-if="iconName" class="ui-link__icon" :name="iconName" :filled />
    <span class="ui-link__name">{{ name }} <slot></slot></span>
  </NuxtLink>
</template>

<style lang="scss">
@use "sass:map";

[class^="ui-link"] {
  width: max-content;
}

@mixin defineStyles($map: $link) {
  @each $size, $val in $map {
    $icon-size: map.get($val, "icon-size");
    $icon-margin: map.get($val, "icon-margin");
    $font-name: map.get($val, "font");

    &.#{$size} {
      .ui-link__icon {
        margin: px2rem($icon-margin);

        svg {
          @include box(px2rem($icon-size));
        }
      }

      .ui-link__name {
        @extend %t__#{$font-name};
      }
    }
  }
}

.ui {
  &-link {
    text-decoration: none;
    @include defineStyles();

    /* * * orientation * * */

    &.horizontal {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: px2rem(map.get($gap, "sm"));
    }

    &.vertical {
      .ui-link__icon {
        margin: auto;
        margin-bottom: px2rem(map.get($spacing, "md"));
      }
    }

    /* * * colors * * */

    &.primary {
      @include themify($themes) {
        color: themed("label", "inactive");
      }

      &:hover {
        @include themify($themes) {
          color: themed("label", "primary") !important;
        }
      }
    }

    &.accent {
      @include themify($themes) {
        color: themed("label", "accent");
      }

      &:hover {
        @include themify($themes) {
          color: themed("label", "primary") !important;
        }
      }
    }
  }
}
</style>
