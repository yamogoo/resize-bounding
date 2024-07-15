<template>
  <div class="ui-setup-guide">
    <div class="ui-setup-guide--header">
      <AtomsMenuTabbar
        :sid
        :items="menuItems"
        @select="(item: TabbarItem<string>) => (sid = item.id)"
      />
    </div>
    <div class="ui-setup-guide--body">
      <div class="ui-setup-guide--body--content">
        <template v-for="({ id, value }, idx) in menuItems" :key="idx">
          <template v-for="(item, hidx) in __DOC__[value]" :key="hidx">
            <AtomsContentCode
              v-if="sid === id"
              :lang="__DOC__[value][hidx].lang"
              :code="__DOC__[value][hidx].code"
              :file-name="__DOC__[value][hidx].fileName"
              block
            />
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TabbarItem } from "@/components/atoms/menu/Tabbar.vue";
import { __DOC__ } from "@/components/docs.js";

const menuItems: Array<TabbarItem<string>> = [
  {
    id: 0,
    label: "Vue3",
    value: "vue3",
  },
  {
    id: 1,
    label: "React",
    value: "react",
  },
];

const sid = ref(0);
</script>

<style lang="scss">
.ui {
  &-setup-guide {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    @include box(100%);

    &--header {
      width: 100%;
      height: 44px;
    }

    &--body {
      display: flex;
      @include box(100%, 100%);
      overflow: auto;

      &--content {
        width: 100%;
        @include padding-h(40px);
        @include padding-v(12px, 40px);
        margin: auto;
      }
    }
  }
}
</style>
