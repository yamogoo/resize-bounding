<script setup lang="ts">
import { ref, type Ref } from "vue";

import { __DOC__ } from "@/components/docs.js";

import Tabbar from "@/components/menu/Tabbar.vue";
import type { TabbarItem } from "@/components/menu/Tabbar.vue";
import Code from "@/components/content/Code.vue";

const sid: Ref<number> = ref(0);
</script>

<script lang="ts">
export const menuItems: Array<TabbarItem<string>> = [
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
</script>

<template>
  <div class="ui-setup-guide">
    <div class="ui-setup-guide--header">
      <Tabbar
        :sid
        :items="menuItems"
        @select="(item: TabbarItem<string>) => (sid = item.id)"
      ></Tabbar>
    </div>
    <div class="ui-setup-guide--body">
      <div class="ui-setup-guide--body--content">
        <template v-for="({ id, value }, idx) in menuItems" :key="idx">
          <template v-for="(_, hidx) in __DOC__[value]" :key="hidx">
            <Code
              v-if="sid === id"
              :lang="__DOC__[value][hidx].lang"
              :code="__DOC__[value][hidx].code"
              :file-name="__DOC__[value][hidx].fileName"
              block
            ></Code>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "sass:map";

.ui {
  &-setup-guide {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    @include box(100%);

    &--header {
      width: 100%;
      padding: map.get($spacing, "sm") map.get($spacing, "lg");
    }

    &--body {
      display: flex;
      @include box(100%, 100%);
      overflow: auto;

      &--content {
        width: 100%;
        margin: auto;
      }
    }
  }
}
</style>
