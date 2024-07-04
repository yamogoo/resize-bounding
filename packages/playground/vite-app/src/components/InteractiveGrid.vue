<template>
  <main class="boundarize-app">
    <div class="boundarize-app--container">
      <div class="boundarize-app__layout">
        <Boundarize
          :height="layout.a.height"
          :min-height="layout.a.minHeight"
          :max-height="layout.a.maxHeight"
          :directions="'b'"
          :style="{ borderBottom: '1px solid gray' }"
          @update:height="
            (height) => {
              layout.a.height = height;
            }
          "
        >
          <UIInnerBlock
            :title="layout.a.title"
            :image-path="'/boundarize-cover.svg'"
          >
            <UISizeField
              :height="layout.a.height"
              @update:height="
                (height) => {
                  layout.a.height = height;
                }
              "
            />
          </UIInnerBlock>
        </Boundarize>
        <Boundarize
          :directions="''"
          :style="[{ display: 'flex', height: '100%' }]"
        >
          <Boundarize
            :width="layout.b.width"
            :min-width="layout.b.minWidth"
            :max-width="layout.b.maxWidth"
            :directions="'r'"
            :style="[{ display: 'flex', borderRight: '1px solid gray' }]"
            @update:width="
              (width) => {
                layout.b.width = width;
              }
            "
          >
            <UIInnerBlock
              :title="layout.b.title"
              :image-path="'/boundarize-cover.svg'"
            >
              <UISizeField
                :width="layout.b.width"
                @update:width="
                  (width) => {
                    layout.b.width = width;
                  }
                "
              />
            </UIInnerBlock>
          </Boundarize>
          <UIInnerBlock
            :title="layout.c.title"
            :image-path="'/boundarize-cover.svg'"
          >
            <UISizeField />
          </UIInnerBlock>
          <Boundarize
            :width="layout.d.width"
            :min-width="layout.d.minWidth"
            :max-width="layout.d.maxWidth"
            :directions="'l'"
            :style="{ borderLeft: '1px solid gray' }"
            @update:width="
              (width) => {
                layout.d.width = width;
              }
            "
          >
            <UIInnerBlock
              :title="layout.d.title"
              :image-path="'/boundarize-cover.svg'"
            >
              <UISizeField
                :width="layout.d.width"
                @update:width="
                  (width) => {
                    layout.d.width = width;
                  }
                "
              />
            </UIInnerBlock>
          </Boundarize>
        </Boundarize>
        <Boundarize
          :height="layout.e.height"
          :min-height="layout.e.minHeight"
          :max-height="layout.e.maxHeight"
          :directions="'t'"
          :style="[
            { display: 'flex', width: '100%', borderTop: '1px solid gray' },
          ]"
          @update:height="
            (height) => {
              layout.e.height = height;
            }
          "
        >
          <Boundarize
            :width="layout.e.width"
            :min-width="layout.e.minWidth"
            :max-width="layout.e.maxWidth"
            :directions="'r'"
            :style="{
              borderRight: '1px solid gray',
            }"
            @update:width="
              (width) => {
                layout.e.width = width;
              }
            "
          >
            <UIInnerBlock
              :title="layout.e.title"
              :image-path="'/boundarize-cover.svg'"
            >
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
          </Boundarize>
          <Boundarize
            :directions="''"
            :style="[{ display: 'flex', width: '100%' }]"
          >
            <UIInnerBlock
              :title="layout.f.title"
              :image-path="'/boundarize-cover.svg'"
            >
              <UISizeField
                :height="layout.e.height"
                @update:height="
                  (height) => {
                    layout.e.height = height;
                  }
                "
              />
            </UIInnerBlock>
          </Boundarize>
        </Boundarize>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";

import { UIInnerBlock, UISizeField } from "ui";
import "ui/style.css";

import Boundarize from "@/components/MyBoundarize.vue";

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
$__border-color: gray;
$__background--primary: #e8ebec;

%container--normal {
  background: $__background--primary;
}

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
    @extend %container--normal;
    border: 1px solid $__border-color;
    border-radius: 24px;
    overflow: hidden;
  }
}
</style>
