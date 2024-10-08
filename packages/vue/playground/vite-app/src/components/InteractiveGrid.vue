<template>
  <main
    class="boundarize-app"
    :style="{ background: `${colors.backgroundApp}` }"
  >
    <div class="boundarize-app--container">
      <div
        class="boundarize-app__layout"
        :style="{
          background: `${colors.backgroundSecondary}`,
          border: `1px solid ${colors.borderNormal}`,
        }"
      >
        <ResizeBounding
          :height="layout.a.height"
          :min-height="layout.a.minHeight"
          :max-height="layout.a.maxHeight"
          :directions="'b'"
          :style="{ borderBottom: borderStyle }"
          @update:height="
            (height) => {
              layout.a.height = height;
            }
          "
        >
          <UIInnerBlock :title="layout.a.title" show-logo>
            <UISizeField
              :height="layout.a.height"
              @update:height="
                (height) => {
                  layout.a.height = height;
                }
              "
            />
          </UIInnerBlock>
        </ResizeBounding>
        <ResizeBounding
          :directions="''"
          :style="[{ display: 'flex', height: '100%' }]"
        >
          <ResizeBounding
            :width="layout.b.width"
            :min-width="layout.b.minWidth"
            :max-width="layout.b.maxWidth"
            :directions="'r'"
            :style="[{ display: 'flex', borderRight: borderStyle }]"
            @update:width="
              (width) => {
                layout.b.width = width;
              }
            "
          >
            <UIInnerBlock :title="layout.b.title">
              <UISizeField
                :width="layout.b.width"
                @update:width="
                  (width) => {
                    layout.b.width = width;
                  }
                "
              />
            </UIInnerBlock>
          </ResizeBounding>
          <UIInnerBlock :title="layout.c.title">
            <UISizeField />
          </UIInnerBlock>
          <ResizeBounding
            :width="layout.d.width"
            :min-width="layout.d.minWidth"
            :max-width="layout.d.maxWidth"
            :directions="'l'"
            :style="{ borderLeft: borderStyle }"
            @update:width="
              (width) => {
                layout.d.width = width;
              }
            "
          >
            <UIInnerBlock :title="layout.d.title">
              <UISizeField
                :width="layout.d.width"
                @update:width="
                  (width) => {
                    layout.d.width = width;
                  }
                "
              />
            </UIInnerBlock>
          </ResizeBounding>
        </ResizeBounding>
        <ResizeBounding
          :height="layout.e.height"
          :min-height="layout.e.minHeight"
          :max-height="layout.e.maxHeight"
          :directions="'t'"
          :style="[{ display: 'flex', width: '100%', borderTop: borderStyle }]"
          @update:height="
            (height) => {
              layout.e.height = height;
            }
          "
        >
          <ResizeBounding
            :width="layout.e.width"
            :min-width="layout.e.minWidth"
            :max-width="layout.e.maxWidth"
            :directions="'r'"
            :style="{ borderRight: borderStyle }"
            @update:width="
              (width) => {
                layout.e.width = width;
              }
            "
          >
            <UIInnerBlock :title="layout.e.title">
              <UISizeField
                :width="layout.e.width"
                :height="layout.e.height"
                @update:width="
                  (width) => {
                    layout.e.width = width;
                  }
                "
                @update:height="
                  (height) => {
                    layout.e.height = height;
                  }
                "
              />
            </UIInnerBlock>
          </ResizeBounding>
          <ResizeBounding
            :directions="''"
            :style="[{ display: 'flex', width: '100%' }]"
          >
            <UIInnerBlock :title="layout.f.title">
              <UISizeField
                :height="layout.e.height"
                @update:height="
                  (height) => {
                    layout.e.height = height;
                  }
                "
              />
            </UIInnerBlock>
          </ResizeBounding>
        </ResizeBounding>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";

import UIInnerBlock from "@/components/helpers/UIInnerBlock.vue";
import UISizeField from "@/components/helpers/UISizeField.vue";

import ResizeBounding from "./ResizeBounding.vue";

import { colors } from "@/components/colors";

const borderStyle = `1px solid ${colors.borderNormal}`;

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
    "a" | "c" | "b" | "e" | "d" | "f",
    Partial<ContainerSize & { title: string }>
  >
> = ref({
  a: {
    height: 200,
    minHeight: 200,
    maxHeight: 320,
    title: "A",
  },
  b: {
    width: 320,
    minWidth: 240,
    maxWidth: 640,
    title: "B",
  },
  c: {
    width: 360,
    title: "C",
  },
  d: {
    width: 320,
    minWidth: 240,
    maxWidth: 640,
    title: "D",
  },
  e: {
    height: 320,
    minHeight: 240,
    maxHeight: 400,
    width: 640,
    minWidth: 240,
    maxWidth: 640,
    title: "E",
  },
  f: {
    title: "F",
  },
});
</script>

<style lang="scss">
.boundarize-app {
  display: flex;
  @include box(100%);

  * {
    user-select: none;
  }

  &--container {
    @include box(100%);
    padding: 20px;
    box-sizing: border-box;
  }

  &__layout {
    display: flex;
    flex-direction: column;
    @include box(100%);
    border-radius: 24px;
    overflow: hidden;
  }
}
</style>
