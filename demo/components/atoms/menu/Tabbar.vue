<template>
  <div class="ui-tabbar-menu">
    <ul class="ui-tabbar-menu--list">
      <li
        v-for="(item, idx) in items"
        :key="idx"
        :class="['ui-tabbar-menu__item', { active: sid === item.id }]"
        @click="$emit('select', item)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Props {
  sid: number;
  items: Array<TabbarItem<any>>;
}

defineProps<Props>();

defineEmits<{
  (e: "select", value: TabbarItem<any>): void;
}>();
</script>

<script lang="ts">
export interface TabbarItem<T> {
  id: number;
  label: string;
  value: T;
}
</script>

<style lang="scss">
.ui {
  &-tabbar-menu {
    &--list {
      display: flex;
      gap: 20px;
      list-style: none;
    }

    &__item {
      cursor: pointer;
      @include use-font-size(--sm);

      &:not(.active) {
        @include themify($app-themes) {
          color: themed("text", "primary");
        }

        &:hover {
          @include themify($app-themes) {
            color: themed("colors", "accent");
          }
        }
      }

      &.active {
        opacity: 1;
        @include themify($app-themes) {
          color: themed("colors", "accent");
        }
      }
    }
  }
}
</style>
