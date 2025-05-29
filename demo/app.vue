<script setup lang="ts">
import { ref } from "vue";
import { useResizeObserver } from "@vueuse/core";

import { useLayoutStore } from "@/stores/layout";

import "@/assets/fonts/_fonts.scss";

const { setAppSize } = useLayoutStore();

const refApp = ref<HTMLDivElement | null>();

useResizeObserver(refApp, (entries) => {
  const entry = entries[0];
  const { width, height } = entry.contentRect;
  setAppSize({ width, height });
});
</script>

<template>
  <main id="app" ref="refApp">
    <NuxtPage />
  </main>
</template>

<style lang="scss">
@use "sass:map";

body {
  -webkit-font-smoothing: antialiased;
  padding: 0;
  margin: 0;

  @include themify($themes) {
    background-color: themed("background", "primary");
  }
}

#app {
  margin: 0;
  padding: 0;
  font-family: map.get($font-family, "primary");
  overflow: hidden;
  @include box(100vw, 100dvh);
  @include themify($themes) {
    background-color: themed("background", "primary");
  }
  @extend %base-transition;

  * {
    box-sizing: border-box;
  }

  * {
    ::-webkit-scrollbar {
      width: map.get($scrollbar, "width");

      &-track {
        border-radius: map.get($scrollbar, "borderRadius");
      }

      &-thumb {
        border-radius: 1px;
        @include themify($themes) {
          background: themed("scrollbar", "thumb");
        }
      }
    }
  }
}
</style>
