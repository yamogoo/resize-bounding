<template>
  <main class="bb-resize-app-example">
    <div class="bb-resize-app-example--container">
      <div class="bb-resize-app-example__layout">
        <Vue3BbResize
          :height="layout.a.height"
          :min-height="layout.a.minHeight"
          :max-height="layout.a.maxHeight"
          :directions="'b'"
          :style="{ position: 'relative', borderBottom: '1px solid gray' }"
          @update:height="
            (height) => {
              layout.a.height = height;
            }
          "
        >
          <HInnerBlock
            :title="layout.a.title"
            :image-path="'/bb-resize-cover.svg'"
          >
            <HSizeField
              :height="layout.a.height"
              @update:height="
                (height) => {
                  layout.a.height = height;
                }
              "
            />
          </HInnerBlock>
        </Vue3BbResize>
        <Vue3BbResize
          :directions="''"
          :style="[{ display: 'flex', height: '100%' }]"
        >
          <Vue3BbResize
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
            <HInnerBlock
              :title="layout.b.title"
              :image-path="'/bb-resize-cover.svg'"
            >
              <HSizeField
                :width="layout.b.width"
                @update:width="
                  (width) => {
                    layout.b.width = width;
                  }
                "
              />
            </HInnerBlock>
          </Vue3BbResize>
          <HInnerBlock
            :title="layout.c.title"
            :image-path="'/bb-resize-cover.svg'"
          >
            <HSizeField />
          </HInnerBlock>
          <Vue3BbResize
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
            <HInnerBlock
              :title="layout.d.title"
              :image-path="'/bb-resize-cover.svg'"
            >
              <HSizeField
                :width="layout.d.width"
                @update:width="
                  (width) => {
                    layout.d.width = width;
                  }
                "
              />
            </HInnerBlock>
          </Vue3BbResize>
        </Vue3BbResize>
        <Vue3BbResize
          :height="layout.e.height"
          :min-height="layout.e.minHeight"
          :max-height="layout.e.maxHeight"
          :directions="'t'"
          :style="[
            { display: 'flex', width: '100%', borderTop: '1px solid gray' },
          ]"
          :options="{
            pane: {
              knob: {
                constantlyShow: true,
              },
            },
          }"
          @update:height="
            (height) => {
              layout.e.height = height;
            }
          "
        >
          <Vue3BbResize
            :width="layout.e.width"
            :min-width="layout.e.minWidth"
            :max-width="layout.e.maxWidth"
            :directions="'r'"
            :options="{
              pane: {
                knob: {
                  constantlyShow: true,
                },
              },
            }"
            :style="{
              borderRight: '1px solid gray',
            }"
            @update:width="
              (width) => {
                layout.e.width = width;
              }
            "
          >
            <HInnerBlock
              :title="layout.e.title"
              :image-path="'/bb-resize-cover.svg'"
            >
              <HSizeField
                :width="layout.e.width"
                :height="layout.e.height"
                @update:width="
                  (width) => {
                    layout.f.width = width;
                  }
                "
                @update:height="
                  (height) => {
                    layout.e.height = height;
                  }
                "
              />
            </HInnerBlock>
          </Vue3BbResize>
          <Vue3BbResize
            :directions="''"
            :style="[{ display: 'flex', width: '100%' }]"
          >
            <HInnerBlock
              :title="layout.f.title"
              :image-path="'/bb-resize-cover.svg'"
            >
              <HSizeField
                :height="layout.e.height"
                @update:height="
                  (height) => {
                    layout.e.height = height;
                  }
                "
              />
            </HInnerBlock>
          </Vue3BbResize>
        </Vue3BbResize>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";

import Vue3BbResize from "@/components/Vue3BbResize.vue";
import HInnerBlock from "@/examples/helpers/HInnerBlock.vue";
import HSizeField from "@/examples/helpers/HSizeField.vue";

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
    width: 360,
    minWidth: 240,
    maxWidth: 640,
    title: "D",
  },
  e: {
    height: 320,
    minHeight: 240,
    maxHeight: 480,
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

.bb-resize-app-example {
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
