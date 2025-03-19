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
  <div class="ui-tabbar-menu" :class="[size]">
    <ul class="ui-tabbar-menu--list">
      <li
        v-for="item in items"
        :key="`${item.id}`"
        data-testid="tabbar-item"
        :class="['ui-tabbar-menu__item', { active: sid === item.id }]"
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
      &.#{$size} {
        .ui-tabbar-menu--list {
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

    &--list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    &__item {
      padding: px2rem(map.get($spacing, "md")) px2rem(map.get($spacing, "xs"));
      cursor: pointer;
      @extend %base-transition;

      &:not(.active) {
        @include themify($themes) {
          color: themed("label", "inactive");
        }

        &:hover {
          @include themify($themes) {
            color: themed("label", "accent");
          }
        }
      }

      &.active {
        opacity: 1;
        @include themify($themes) {
          color: themed("label", "accent");
        }
      }
    }
  }
}
</style>
