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
    // padding: 10px 0px;

    &--list {
      display: flex;
      gap: 20px;
      list-style: none;
    }

    &__item {
      @include use-font-size(--sm);
      @include themify($app-themes) {
        color: themed("text", "primary");
      }
      cursor: pointer;

      &:not(.active) {
        opacity: 0.35;
      }
      &.active {
        opacity: 1;
      }
    }
  }
}
</style>
