<template>
  <div class="bb-resize-example">
    <div class="bb-resize-example__layout">
      <Vue3BbResize
        class="bb-resize-example__layout--top"
        :height="layout.top.height"
        :min-width="240"
        :max-width="480"
        :right="true"
        :bottom="true"
        @update:height="(height: number) => { layout.top.height = height }"
      >
        <div class="bb-resize-example__layout--top--container">
          <Vue3BbResize
            class="bb-resize-example__navigator"
            :width="layout.navigator.width"
            :min-width="240"
            :max-width="480"
            :right="true"
            @update:width="(width: number) => { layout.navigator.width = width }"
          >
            <h1>Navigator</h1>
          </Vue3BbResize>
          <Vue3BbResize
            class="bb-resize-example__viewport"
            :width="layout.viewport.width"
            :min-width="240"
            :max-width="480"
            :right="true"
            :bottom="true"
            @update:width="(width: number) => { layout.viewport.width = width }"
          >
            <h1>Viewport</h1>
          </Vue3BbResize>
          <div class="bb-resize-example__effects">
            <h1>Effects</h1>
          </div>
        </div>
      </Vue3BbResize>

      <Vue3BbResize
        class="bb-resize-example__layout--bottom"
        :min-width="240"
        :max-width="480"
        :right="true"
        :bottom="true"
      >
        <div class="bb-resize-example__layout--bottom--container">
          <Vue3BbResize
            class="bb-resize-example__timeline"
            :width="layout.timeline.width"
            :min-width="240"
            :max-width="480"
            :right="true"
            :bottom="true"
            @update:width="(width: number) => { layout.timeline.width = width }"
          >
            <h1>Timeline</h1>
          </Vue3BbResize>
        </div>
      </Vue3BbResize>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";

import Vue3BbResize from "./components/Vue3BbResize.vue";

interface ContainerSize {
  width?: number;
  height?: number;
}

const layout: Ref<
  Record<
    "navigator" | "effects" | "viewport" | "timeline" | "top",
    ContainerSize
  >
> = ref({
  navigator: {
    width: 320,
  },
  effects: {
    width: 360,
  },
  viewport: {
    width: 360,
  },
  timeline: {
    width: 360,
  },
  top: {
    height: 480,
  },
});
</script>

<style lang="scss">
$__border-color: #000;

%border-right {
  border-right: 1px solid $__border-color;
}

%border-bottom {
  border-bottom: 1px solid $__border-color;
}

body,
#app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.bb-resize-example {
  display: flex;
  width: 100%;
  height: 100%;

  &__layout {
    width: 100%;
    height: 100%;

    &--top {
      &--container {
        display: flex;
        width: 100%;
        height: 100%;
      }

      @extend %border-bottom;
    }

    &--bottom {
      &--container {
        display: flex;
        width: 100%;
        height: 100%;
      }
    }
  }

  &__navigator {
    @extend %border-right;
  }

  &__effects {
    width: 100%;
    @extend %border-right;
  }

  &__viewport {
    @extend %border-right;
  }

  &__timeline {
    @extend %border-right;
  }
}
</style>
