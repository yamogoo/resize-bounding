<template>
  <main class="app">
    <div class="app--container">
      <div class="app__layout">
        <ClientOnly>
          <UIBoundarize
            :height="layout.header.height"
            :min-height="layout.header.minHeight"
            :max-height="layout.header.maxHeight"
            :directions="'b'"
            :style="{ borderBottom: '1px solid gray' }"
            @update:height="
              (height) => {
                layout.header.height = height;
              }
            "
          >
            <UIRoundedContainer> </UIRoundedContainer>
          </UIBoundarize>
          <UIBoundarize
            :directions="''"
            :style="[{ display: 'flex', height: '100%' }]"
          >
            <UIBoundarize
              :width="layout.cover.width"
              :min-width="layout.cover.minWidth"
              :max-width="layout.cover.maxWidth"
              :directions="'r'"
              :style="[{ display: 'flex', borderRight: '1px solid gray' }]"
              @update:width="
                (width) => {
                  layout.cover.width = width;
                }
              "
            >
              <UIRoundedContainer>
                <template #header>
                  <UISizeField
                    :width="layout.cover.width"
                    @update:width="
                      (width) => {
                        layout.cover.width = width;
                      }
                    "
                  />
                </template>
                <h3>Supports Mouse & Touch Events</h3>
              </UIRoundedContainer>
            </UIBoundarize>

            <UIRoundedContainer>
              <UIMainCover
                :title="layout.description.title"
                description="The versatile and user-friendly Vue 3 component that enables
                  intuitive resizing of inner user components via draggable
                  boundary panes."
                :image-path="'/boundarize-cover.svg'"
              />
            </UIRoundedContainer>
            <UIBoundarize
              :width="layout.setupGuide.width"
              :min-width="layout.setupGuide.minWidth"
              :max-width="layout.setupGuide.maxWidth"
              :directions="'l'"
              :style="{
                display: 'flex',
                flexDirection: 'column',
                gap: '0px',
                borderLeft: '1px solid gray',
              }"
              @update:width="
                (width) => {
                  layout.setupGuide.width = width;
                }
              "
            >
              <UIRoundedContainer>
                <template #header>
                  <UISizeField
                    :width="layout.setupGuide.width"
                    @update:width="
                      (width) => {
                        layout.setupGuide.width = width;
                      }
                    "
                  />
                </template>
                <h3>{{ layout.setupGuide.title }}</h3>
                <UIBoxedLink :src="'/'">npm i vue3-bb-resize</UIBoxedLink>
                <UIBoxedLink :src="'/'">yarn add vue3-bb-resize</UIBoxedLink>
              </UIRoundedContainer>
              <UIRoundedContainer>
                <template #header>
                  <UISizeField
                    :width="layout.setupGuide.width"
                    @update:width="
                      (width) => {
                        layout.setupGuide.width = width;
                      }
                    "
                  />
                </template>
                <h3>{{ layout.setupGuide.title }}</h3>
                <UIBoxedLink />
              </UIRoundedContainer>
            </UIBoundarize>
          </UIBoundarize>
          <UIBoundarize
            :height="layout.info.height"
            :min-height="layout.info.minHeight"
            :max-height="layout.info.maxHeight"
            :directions="'t'"
            :style="[
              { display: 'flex', width: '100%', borderTop: '1px solid gray' },
            ]"
            @update:height="
              (height) => {
                layout.info.height = height;
              }
            "
          >
            <UIBoundarize
              :width="layout.info.width"
              :min-width="layout.info.minWidth"
              :max-width="layout.info.maxWidth"
              :directions="'r'"
              :style="{
                borderRight: '1px solid gray',
              }"
              @update:width="
                (width) => {
                  layout.info.width = width;
                }
              "
            >
              <UIRoundedContainer>
                <template #header>
                  <UISizeField
                    :width="layout.info.width"
                    :height="layout.info.height"
                    @update:width="
                      (width) => {
                        layout.info.width = width;
                      }
                    "
                    @update:height="
                      (height) => {
                        layout.info.height = height;
                      }
                    "
                  />
                </template>
                <h1>{{ layout.info.title }}</h1>
              </UIRoundedContainer>
            </UIBoundarize>
            <UIBoundarize
              :directions="''"
              :style="[{ display: 'flex', width: '100%' }]"
            >
              <UIRoundedContainer>
                <template #header>
                  <UISizeField
                    :height="layout.info.height"
                    @update:height="
                      (height) => {
                        layout.info.height = height;
                      }
                    "
                  />
                </template>
                <h1>{{ layout.documentation.title }}</h1>
              </UIRoundedContainer>
            </UIBoundarize>
          </UIBoundarize>
        </ClientOnly>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";

import UIBoundarize from "@/components/atoms/UIBoundarize.vue";
import UIRoundedContainer from "@/components/atoms/UIRoundedContainer.vue";
import UISizeField from "@/components/atoms/UISizeField.vue";
import UIBoxedLink from "@/components/atoms/UIBoxedLink.vue";
import UIMainCover from "@/components/atoms/covers/UIMainCover.vue";

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
    | "header"
    | "description"
    | "info"
    | "cover"
    | "setupGuide"
    | "documentation",
    Partial<ContainerSize & { title: string }>
  >
> = ref({
  header: {
    height: 86,
    minHeight: 86,
    maxHeight: 86,
    title: "Header",
  },
  cover: {
    width: 480,
    minWidth: 240,
    maxWidth: 480,
    title: "Cover",
  },
  description: {
    width: 360,
    title: "Resize Bounding",
  },
  setupGuide: {
    width: 360,
    minWidth: 360,
    maxWidth: 480,
    title: "Installation",
  },
  info: {
    height: 360,
    minHeight: 240,
    maxHeight: 400,
    width: 640,
    minWidth: 240,
    maxWidth: 640,
    title: "Info",
  },
  documentation: {
    title: "Documentation",
  },
});
</script>

<style lang="scss">
$__border-color: gray;
$__background--primary: #e8ebec;

%container--normal {
  background: $__background--primary;
}

.app {
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
