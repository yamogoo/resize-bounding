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
  target?: "_blank" | "_self" | "_parent" | "_top";
  name?: string;
  iconName?: SymbolName;
  orientation?: BaseLinkOrientation;
  color?: BaseLinkColor;
  size?: BasicLinkSize;
  filled?: boolean;
}
</script>

<template>
  <a
    class="ui-link"
    data-testid="ui-link"
    :href="to"
    :target
    :class="[
      {
        [`ui-link_${size}`]: size,
        [`ui-link_${color}`]: color,
        [`ui-link_${orientation}`]: orientation,
      },
    ]"
  >
    <Icon v-if="iconName" class="ui-link__icon" :name="iconName" :filled />
    <slot name="icon"></slot>
    <span class="ui-link__name">{{ name }} <slot></slot></span>
  </a>
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

    &_#{$size} {
      .ui-link__icon {
        @include box(px2rem($icon-size));
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

    &_horizontal {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: px2rem(map.get($gap, "sm"));
    }

    &_vertical {
      .ui-link__icon {
        margin: auto;
        margin-bottom: px2rem(map.get($spacing, "md"));
      }
    }

    /* * * colors * * */

    &_primary {
      @include themify($themes) {
        color: themed("label", "inactive");
      }

      &:hover {
        @include themify($themes) {
          color: themed("label", "primary") !important;
        }
      }
    }

    &_accent {
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
