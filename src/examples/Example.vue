<template>
  <!-- <h1 class="title">Resize Bounding</h1> -->
  <main class="bb-resize-app-example">
    <div class="bb-resize-app-example--container">
      <div class="bb-resize-app-example__layout">
        <!-- Overriding -->
        <MyBBResize
          class="bb-resize-app-example__layout--control-panel"
          :height="layout.controlPanel.height"
          :min-height="layout.controlPanel.minHeight"
          :max-height="layout.controlPanel.maxHeight"
          :directions="'b'"
          @update:height="
            (height) => {
              layout.controlPanel.height = height;
            }
          "
        >
          <div class="bb-resize-app-example__layout--control-panel--container">
            <div class="bb-resize-app-example__logo">
              <p class="bb-resize-app-example__logo--descriptor">
                Resize Bounding
              </p>
            </div>
            <div class="bb-resize-app-example__control-panel">
              <label>Navigator width</label>
              <input type="number" v-model="layout.navigator.width" />

              <label>Effects width</label>
              <input type="number" v-model="layout.effects.width" />

              <label>Timeline height</label>
              <input type="number" v-model="layout.timeline.height" />

              <label>Props width</label>
              <input type="number" v-model="layout.timelineProps.width" />
            </div>
          </div>
        </MyBBResize>

        <Vue3BbResize class="bb-resize-app-example__layout--top">
          <div class="bb-resize-app-example__layout--top--container">
            <Vue3BbResize
              class="bb-resize-app-example__navigator"
              :width="layout.navigator.width"
              :min-width="layout.navigator.minWidth"
              :max-width="layout.navigator.maxWidth"
              :directions="'r'"
              @update:width="
                (width) => {
                  layout.navigator.width = width;
                }
              "
            >
              <HInnerBlock :image-path="'/$a.shape.svg'"> </HInnerBlock>
            </Vue3BbResize>

            <HInnerBlock :image-path="'/$a.shape.svg'"> </HInnerBlock>
            <Vue3BbResize
              class="bb-resize-app-example__effects"
              :width="layout.effects.width"
              :min-width="layout.effects.minWidth"
              :max-width="layout.effects.maxWidth"
              :directions="'l'"
              @update:width="
                (width) => {
                  layout.effects.width = width;
                }
              "
            >
              <HInnerBlock :image-path="'/$a.shape.svg'"> </HInnerBlock>
            </Vue3BbResize>
          </div>
        </Vue3BbResize>

        <Vue3BbResize
          class="bb-resize-app-example__layout--bottom"
          :height="layout.timeline.height"
          :min-height="layout.timeline.minHeight"
          :max-height="layout.timeline.maxHeight"
          :directions="'t'"
          :options="{
            pane: {
              knob: {
                constantlyShow: true,
              },
            },
          }"
          @update:height="
            (height) => {
              layout.timeline.height = height;
            }
          "
        >
          <div class="bb-resize-app-example__layout--bottom--container">
            <Vue3BbResize
              class="bb-resize-app-example__timeline-props"
              :width="layout.timelineProps.width"
              :min-width="layout.timelineProps.minWidth"
              :max-width="layout.timelineProps.maxWidth"
              :directions="'r'"
              @update:width="
                (width) => {
                  layout.timelineProps.width = width;
                }
              "
            >
              <HInnerBlock :image-path="'/$a.shape.svg'"> </HInnerBlock>
            </Vue3BbResize>
            <Vue3BbResize class="bb-resize-app-example__timeline">
              <HInnerBlock :image-path="'/$a.shape.svg'"> </HInnerBlock>
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
import MyBBResize from "./MyBBResize.vue";
import HInnerBlock from "@/examples/helpers/HInnerBlock.vue";

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
    | "controlPanel",
    Partial<ContainerSize>
  >
> = ref({
  navigator: {
    width: 320,
    minWidth: 240,
    maxWidth: 640,
  },
  effects: {
    width: 360,
    minWidth: 240,
    maxWidth: 640,
  },
  viewport: {
    width: 360,
  },
  timeline: {
    height: 320,
    minHeight: 240,
    maxHeight: 480,
  },
  timelineProps: {
    width: 360,
    minWidth: 240,
    maxWidth: 480,
  },
  controlPanel: {
    height: 44,
    minHeight: 44,
    maxHeight: 80,
  },
});
</script>

<style lang="scss">
$__border-color: #cccccc;
$__background--primary: #e8ebec;
$__background--secondary: #dde0e1;

%border-right {
  border-right: 1px solid $__border-color;
}

%border-bottom {
  border-bottom: 1px solid $__border-color;
}

%container--normal {
  background: $__background--primary;
}

%container--accent {
  background: $__background--secondary;
}

.bb-resize-app-example {
  &__heading {
    font-size: 76px;
    font-weight: 500;
  }
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
    @extend %container--normal;

    &--top {
      height: 100%;
      overflow: hidden;

      &--container {
        display: flex;
        @include box(100%);
      }

      @extend %border-bottom;
    }

    &--control-panel {
      &--container {
        display: flex;
        flex-direction: row;
        gap: 12px;
        @include box(100%);
      }

      @extend %border-bottom;
    }

    &--bottom {
      // overflow: hidden;

      &--container {
        display: flex;
        @include box(100%);
      }
    }
  }

  &__logo {
    display: flex;
    flex-direction: row;
    gap: 12px;
  }

  &__control-panel {
    display: flex;
    flex-direction: row;
    gap: 12px;
  }

  &__navigator {
    @extend %border-right;
  }

  // &__effects {}

  &__viewport {
    @include box(100%);
    padding: 20px;
    @extend %container--accent;
    @extend %border-right;

    &--container {
      @include box(100%);
    }

    &__canvas {
      display: flex;
      align-items: center;
      justify-content: center;
      @include box(100%);
      @extend %container--normal;
    }
  }

  &__timeline-props {
    @extend %border-right;
  }

  // &__timeline { }
}
</style>
