<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import { useRuntimeConfig } from "#app";
import { useConfigStore } from "@/stores/config";
import g from "gsap";

import { __DOC__ } from "@/components/docs.js";

import Tabbar from "@/components/menu/Tabbar.vue";
import type { TabbarItem } from "@/components/menu/Tabbar.vue";
import Code from "@/components/content/Code.vue";
import DocumentationLink from "@/components/controls/DocumentationLink.vue";

const runtimeConfig = useRuntimeConfig();

const { setCurrentPackageVersion } = useConfigStore();

const sid: Ref<number> = ref(0);

onMounted(() => {
  setCurrentPackageVersion(menuItems[sid.value].version);
});

const onSelectTabItem = (item: TabbarItem<string>) => {
  const i = item as ExtendedTabbarItem;
  sid.value = i.id;
  setCurrentPackageVersion(i.version);
};

/* * * Animations * * */

const onLinkEnter = (el: Element, done: () => void): void => {
  const width = el.clientWidth;

  g.fromTo(
    el,
    {
      x: width,
      opacity: 0.0,
    },
    {
      x: 0,
      opacity: 1.0,
      ease: "power4.out",
      duration: 0.55,
      onComplete: done,
    },
  );
};

const onLinkLeave = (el: Element, done: () => void): void => {
  const width = el.clientWidth;

  g.to(el, {
    x: -width,
    opacity: 0.0,
    ease: "power4.out",
    duration: 0.5,
    onComplete: done,
  });
};

const menuItems: Array<ExtendedTabbarItem> = [
  {
    id: 0,
    label: "Vue3",
    value: "vue3",
    version: runtimeConfig.public.productVueVersion,
    link: import.meta.env.VITE_VUE3_DOCS_URL,
    linkName: "vue3 documentation",
    show: Boolean(+import.meta.env.VITE_ENABLE_VUE3_DOCS),
  },
  {
    id: 1,
    label: "React",
    value: "react",
    version: runtimeConfig.public.productReactVersion,
    link: import.meta.env.VITE_REACT_DOCS_URL,
    linkName: "react documentation",
    show: Boolean(+import.meta.env.VITE_ENABLE_REACT_DOCS),
  },
];
</script>

<script lang="ts">
interface ExtendedTabbarItem extends TabbarItem<string> {
  version: string;
  link: string;
  linkName: string;
  show: boolean;
}
</script>

<template>
  <div class="ui-setup-guide">
    <div class="ui-setup-guide__header">
      <Tabbar :sid :items="menuItems" @select="onSelectTabItem"></Tabbar>
    </div>
    <div class="ui-setup-guide__body">
      <div class="ui-setup-guide__body-content">
        <template
          v-for="({ id, value, link, linkName, show }, idx) in menuItems"
          :key="idx"
        >
          <template v-for="(_, hidx) in __DOC__[value]" :key="hidx">
            <Code
              v-if="sid === id"
              :lang="__DOC__[value][hidx].lang"
              :code="__DOC__[value][hidx].code"
              :file-name="__DOC__[value][hidx].fileName"
              block
            ></Code>
          </template>
          <Transition :css="false" @enter="onLinkEnter" @leave="onLinkLeave">
            <DocumentationLink
              v-if="sid === id && show"
              class="ui-setup-guide__documentation-link"
              :to="link"
              :target="'_blank'"
              :name="linkName"
            ></DocumentationLink>
          </Transition>
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

    &__header {
      width: 100%;
      padding: 0 px2rem(map.get($spacing, "xs"));
    }

    &__body {
      display: flex;
      @include box(100%, 100%);
      overflow: auto;

      &-content {
        width: 100%;
        margin: auto;
      }
    }

    &__documentation-link {
      position: absolute;
      right: px2rem(map.get($spacing, "sm"));
      bottom: px2rem(map.get($spacing, "sm"));
    }
  }
}
</style>
