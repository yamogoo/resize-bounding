<script setup lang="ts" generic="T">
import tokens from "@/tokens";

withDefaults(defineProps<Props<T>>(), {
  size: "md",
});

defineEmits<{
  (e: "select", value: TabbarItem<T>): void;
}>();
</script>

<script lang="ts">
export type TabbarSize = keyof typeof tokens.tabbar;

export interface TabbarItem<T> {
  id: number;
  label: string;
  value: T;
}

export interface Props<T> {
  sid: number;
  items: Array<TabbarItem<T>>;
  size?: TabbarSize;
}
</script>

<template>
  <div class="ui-tabbar-menu" :class="[{ [`ui-tabbar-menu_${size}`]: size }]">
    <ul class="ui-tabbar-menu__list">
      <li
        v-for="item in items"
        :key="`${item.id}`"
        data-testid="tabbar-item"
        :class="[
          'ui-tabbar-menu__item',
          { 'ui-tabbar-menu__item_active': sid === item.id },
        ]"
        @click="$emit('select', item)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineStyles($map: $tabbar) {
  @each $size, $val in $map {
    & {
      &_#{$size} {
        .ui-tabbar-menu__list {
          gap: px2rem(map.get($val, "gap"));
        }

        .ui-tabbar-menu__item {
          @extend %t__#{map.get($val, "font")};
        }
      }
    }
  }
}

.ui {
  &-tabbar-menu {
    @include defineStyles();

    &__list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    &__item {
      padding: px2rem(map.get($spacing, "md")) px2rem(map.get($spacing, "xs"));
      cursor: pointer;
      @extend %base-transition;

      &:not(.ui-tabbar-menu__item_active) {
        @include themify($themes) {
          color: themed("label", "inactive");
        }

        &:hover {
          @include themify($themes) {
            color: themed("label", "accent");
          }
        }
      }

      &_active {
        opacity: 1;
        @include themify($themes) {
          color: themed("label", "accent");
        }
      }
    }
  }
}
</style>
