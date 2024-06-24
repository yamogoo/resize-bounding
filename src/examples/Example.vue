<template>
  <main class="bb-resize-app-example">
    <div class="bb-resize-app-example--container">
      <div class="bb-resize-app-example__layout">
        <Vue3BbResize
          class="bb-resize-app-example__layout--control-panel"
          :height="layout.controlPanel.height"
          :min-height="layout.controlPanel.minHeight"
          :max-height="layout.controlPanel.maxHeight"
          :directions="'b'"
          @update:height="(height: number) => { layout.controlPanel.height = height }"
        >
          <h1>Control Panel</h1>
        </Vue3BbResize>

        <Vue3BbResize class="bb-resize-app-example__layout--top">
          <div class="bb-resize-app-example__layout--top--container">
            <Vue3BbResize
              class="bb-resize-app-example__navigator"
              :width="layout.navigator.width"
              :min-width="240"
              :max-width="480"
              :directions="'r'"
              @update:width="(width: number) => { layout.navigator.width = width }"
            >
              <h1>Navigator</h1>
            </Vue3BbResize>

            <div class="bb-resize-app-example__viewport">
              <h1>Viewport</h1>
            </div>
            <Vue3BbResize
              class="bb-resize-app-example__effects"
              :width="layout.viewport.width"
              :min-width="240"
              :directions="'l'"
              @update:width="(width: number) => { layout.viewport.width = width }"
            >
              <h1>Effects</h1>
            </Vue3BbResize>
          </div>
        </Vue3BbResize>

        <Vue3BbResize
          class="bb-resize-app-example__layout--bottom"
          :height="layout.bottom.height"
          :min-height="240"
          :max-height="480"
          :directions="'t'"
          @update:height="(height: number) => { layout.bottom.height = height }"
        >
          <div class="bb-resize-app-example__layout--bottom--container">
            <Vue3BbResize
              class="bb-resize-app-example__timeline-props"
              :width="layout.timelineProps.width"
              :min-width="240"
              :max-width="480"
              :directions="'rt'"
              @update:width="(width: number) => { layout.timelineProps.width = width }"
            >
              <h1>Props</h1>
            </Vue3BbResize>
            <Vue3BbResize class="bb-resize-app-example__timeline">
              <h1>Timeline</h1>
            </Vue3BbResize>
          </div>
        </Vue3BbResize>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";

import Vue3BbResize from "@/components/Vue3BbResize.vue";

interface ContainerSize {
  width: number;
  minWidth: number;
  maxWidth: number;
  height: number;
  minHeight: number;
  maxHeight: number;
}

const layout: Ref<
  Record<
    | "navigator"
    | "effects"
    | "viewport"
    | "timeline"
    | "timelineProps"
    | "bottom"
    | "controlPanel",
    Partial<ContainerSize>
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
  timeline: {},
  timelineProps: {
    width: 360,
  },
  controlPanel: {
    height: 44,
    minHeight: 44,
    maxHeight: 80,
  },
  bottom: {
    height: 320,
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

.bb-resize-app-example {
  display: flex;
  width: 100%;
  height: 100%;

  &--container {
    @include box(100%);
    padding: 40px;
    box-sizing: border-box;
  }

  &__layout {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border: 1px solid $__border-color;
    border-radius: 24px;
    overflow: hidden;

    &--top {
      &--container {
        display: flex;
        width: 100%;
        height: 100%;
      }

      @extend %border-bottom;
    }

    &--control-panel {
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

  // &__effects {}

  &__viewport {
    width: 100%;
    @extend %border-right;
  }

  &__timeline-props {
    @extend %border-right;
  }

  // &__timeline { }
}
</style>
