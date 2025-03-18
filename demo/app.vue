<script lang="ts">
import "@/assets/fonts/_fonts.scss";
</script>

<template>
  <main id="app">
    <NuxtPage />
  </main>
</template>

<style lang="scss">
@use "sass:map";

#app,
body,
#__nuxt {
  margin: 0;
  padding: 0;
  font-family: map.get($font-family, "primary");
  overflow: hidden;
  @include box(100vw, 100vh);
  @include themify($themes) {
    background-color: themed("background", "primary");
  }
  @extend %base-transition;

  * {
    box-sizing: border-box;

    &::selection {
      @include themify($themes) {
        color: themed("selection", "color") !important;
        background: themed("selection", "background") !important;
      }
    }
  }

  * {
    ::-webkit-scrollbar {
      width: map.get($scrollbar, "width");

      &-track {
        border-radius: map.get($scrollbar, "border-radius");
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
