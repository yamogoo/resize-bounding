<script setup lang="ts">
import { storeToRefs, useHead, useRuntimeConfig } from "#imports";
import { onMounted, onUnmounted, ref, watch } from "vue";

import { useLayoutStore } from "@/stores/layout";

import Desktop from "@/components/pages/Desktop.vue";
import Mobile from "@/components/pages/Mobile.vue";

const runtimeConfig = useRuntimeConfig();

useHead({
  title: runtimeConfig.public.appTitle,
  meta: [
    {
      name: "description",
      content: runtimeConfig.public.appDescription,
    },
  ],
});

const { layoutType } = storeToRefs(useLayoutStore());

const isMounted = ref(false);

const refLayout = ref<HTMLDivElement | null>(null);

const layoutSize = ref({
  width: 0,
  height: 0,
});

const onSetLayout = (): void => {
  if (refLayout.value) {
    layoutSize.value = {
      width: refLayout.value.clientWidth,
      height: refLayout.value.clientHeight,
    };
  }
};

watch(
  refLayout,
  () => {
    if (refLayout.value) onSetLayout();
  },
  { immediate: true },
);

onMounted(() => {
  isMounted.value = true;
  window.addEventListener("resize", onSetLayout);
});

onUnmounted(() => {
  isMounted.value = false;
  window.removeEventListener("resize", onSetLayout);
});
</script>

<template>
  <main class="main page">
    <div class="main__container">
      <div ref="refLayout" class="main__layout">
        <Desktop v-if="layoutType === 'desktop'" :layout-size="layoutSize" />
        <Mobile v-if="layoutType === 'mobile'" :layout-size="layoutSize" />
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@use "sass:map";

.main {
  display: flex;
  @include box(100%);
  @extend %base-transition;

  * {
    user-select: none;
  }

  &__container {
    @include box(100%);
    box-sizing: border-box;

    @include respond-above("md") {
      padding: px2rem(
        map.get(
          map.get(map.get($mainContainer, "respond"), "desktop"),
          "padding"
        )
      );
    }

    @include respond-below("md") {
      padding: px2rem(
        map.get(
          map.get(map.get($mainContainer, "respond"), "mobile"),
          "padding"
        )
      );
    }
  }

  &__layout {
    display: flex;
    flex-direction: column;
    @include box(100%);
    overflow: hidden;
  }

  .layout-resizer-top {
    min-height: px2rem(map.get(map.get($layout, "topResizer"), "minHeight"));
  }

  .intro-block {
    .ui-block-container--container {
      @include themify($themes) {
        background-color: themed("background", "cover");
      }
    }
  }
}
</style>
