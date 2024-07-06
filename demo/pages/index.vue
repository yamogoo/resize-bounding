<template>
  <main class="app">
    <div class="app--container">
      <div class="app__layout" ref="refLayout">
        <ClientOnly>
          <!-- <Boundarize
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
            <AtomsContainersRoundedContainer> </AtomsContainersRoundedContainer>
          </Boundarize> -->
          <Boundarize
            :directions="''"
            :style="[{ display: 'flex', height: '100%' }]"
          >
            <Boundarize
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
              <AtomsContainersRoundedContainer>
                <template #header>
                  <AtomsInputsSizeField
                    :width="layout.cover.width"
                    @update:width="
                      (width) => {
                        layout.cover.width = width;
                      }
                    "
                  />
                </template>

                <AtomsCoversMainCover
                  title="Resize Bounding"
                  :version="'1.0.0'"
                />
              </AtomsContainersRoundedContainer>
            </Boundarize>

            <AtomsContainersRoundedContainer>
              <AtomsCoversMainIntro
                :title="'Supports Mouse & Touch Events'"
                description="The versatile and user-friendly Vue3 component that enables
                  intuitive resizing of inner user components via draggable
                  boundary panes."
                :image-path="'/boundarize-cover.svg'"
              />
            </AtomsContainersRoundedContainer>
            <Boundarize
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
              <AtomsContainersRoundedContainer>
                <template #header>
                  <AtomsInputsSizeField
                    :width="layout.setupGuide.width"
                    @update:width="
                      (width) => {
                        layout.setupGuide.width = width;
                      }
                    "
                  />
                </template>
                <AtomsCoversMainGuide
                  :links="[
                    { name: 'npm i vue3-resize-bounding' },
                    { name: 'yarn add vue3-resize-bounding' },
                  ]"
                />
              </AtomsContainersRoundedContainer>
              <!-- <AtomsContainersRoundedContainer>
                <template #header>
                  <AtomsInputsSizeField
                    :width="layout.setupGuide.width"
                    @update:width="
                      (width) => {
                        layout.setupGuide.width = width;
                      }
                    "
                  />
                </template>
                <AtomsCoversMainAdditionGuide />
              </AtomsContainersRoundedContainer> -->
            </Boundarize>
          </Boundarize>
          <Boundarize
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
            <Boundarize
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
              <AtomsContainersRoundedContainer>
                <template #header>
                  <AtomsInputsSizeField
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
                <AtomsCoversMainInfo />
              </AtomsContainersRoundedContainer>
            </Boundarize>
            <Boundarize
              :directions="''"
              :style="[{ display: 'flex', width: '100%' }]"
            >
              <AtomsContainersRoundedContainer>
                <template #header>
                  <AtomsInputsSizeField
                    :height="layout.info.height"
                    @update:height="
                      (height) => {
                        layout.info.height = height;
                      }
                    "
                  />
                </template>
                <!-- <h1>{{ layout.documentation.title }}</h1> -->
                <AtomsDocumentationSetupGuide />
              </AtomsContainersRoundedContainer>
            </Boundarize>
          </Boundarize>
        </ClientOnly>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";

import Boundarize from "@/components/atoms/resizers/Boundarize.vue";

const runtimeConfig = useRuntimeConfig();

useHead({
  title: runtimeConfig.public.appName,
  meta: [
    {
      name: "description",
      content: runtimeConfig.public.appDescription,
    },
  ],
});

interface ContainerSize {
  width: number;
  minWidth: number;
  maxWidth: number;
  height: number;
  minHeight: number;
  maxHeight: number;
}

const isMounted = ref(false);

const refLayout = ref<HTMLDivElement | null>(null);

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
  },
  cover: {
    width: 480,
    minWidth: 360,
    maxWidth: 960,
  },
  description: {
    width: 360,
    title: "Resize Bounding",
  },
  setupGuide: {
    width: 420,
    minWidth: 360,
    maxWidth: 960,
  },
  info: {
    height: 360,
    minHeight: 280,
    maxHeight: 640,
    width: 800,
    minWidth: 480,
    maxWidth: 960,
    title: "Info",
  },
  documentation: {
    title: "Documentation",
  },
});

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

    const hFactor = layoutSize.value.width > 1024 ? 4 : 3;

    // resize layout:
    layout.value.cover.width = Math.round(layoutSize.value.width / hFactor);
    layout.value.setupGuide.width = Math.round(
      layoutSize.value.width / hFactor,
    );
    layout.value.info.width = Math.round(layoutSize.value.width / 2);
    layout.value.info.height = Math.round(layoutSize.value.height / 2.5);
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
