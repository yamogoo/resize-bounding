<template>
  <main class="intro">
    <div class="intro--container">
      <div class="intro__layout" ref="refLayout">
        <ClientOnly>
          <AtomsContainerResizeBounding
            :directions="''"
            :style="[{ display: 'flex', height: '100%' }]"
          >
            <AtomsContainerResizeBounding
              :width="layout.cover.width"
              :min-width="layout.cover.minWidth"
              :max-width="layout.cover.maxWidth"
              :directions="'r'"
              class="ui--border --r"
              :style="[{ display: 'flex' }]"
              @update:width="
                (width) => {
                  layout.cover.width = width;
                }
              "
            >
              <AtomsContainerRounded>
                <template #header>
                  <AtomsInputSizeField
                    :width="layout.cover.width"
                    :height="layoutSize.height - (layout.info.height ?? 0)"
                  />
                </template>
                <AtomsCoverMain
                  title="Resize Bounding"
                  :version="runtimeConfig.public.productVersion"
                />
              </AtomsContainerRounded>
            </AtomsContainerResizeBounding>

            <AtomsContainerRounded>
              <template #header>
                <AtomsInputSizeField
                  :width="introWidth"
                  :height="layoutSize.height - (layout.info.height ?? 0)"
                  transparent
                />
              </template>
              <AtomsCoverIntro
                :title="'Supports Mouse & Touch Events'"
                description="The versatile and user-friendly Vue3 component that enables
                  intuitive resizing of inner user components via draggable
                  boundary panes."
                :image-path="'/resize-bounding-cover.svg'"
              />
            </AtomsContainerRounded>
            <AtomsContainerResizeBounding
              :width="layout.setupGuide.width"
              :min-width="layout.setupGuide.minWidth"
              :max-width="layout.setupGuide.maxWidth"
              :directions="'l'"
              class="ui--border --l"
              :style="{
                display: 'flex',
                flexDirection: 'column',
                gap: '0px',
              }"
              @update:width="
                (width) => {
                  layout.setupGuide.width = width;
                }
              "
            >
              <AtomsContainerRounded>
                <template #header>
                  <AtomsInputSizeField
                    :width="layout.setupGuide.width"
                    :height="layoutSize.height - (layout.info.height ?? 0)"
                  />
                </template>
                <AtomsCoverGuide
                  :links="[
                    { name: 'npm i vue3-resize-bounding' },
                    { name: 'yarn add vue3-resize-bounding' },
                  ]"
                />
              </AtomsContainerRounded>
            </AtomsContainerResizeBounding>
          </AtomsContainerResizeBounding>
          <AtomsContainerResizeBounding
            :height="layout.info.height"
            :min-height="layout.info.minHeight"
            :max-height="layout.info.maxHeight"
            :directions="'t'"
            class="ui--border --t"
            :style="[{ display: 'flex', width: '100%' }]"
            @update:height="
              (height) => {
                layout.info.height = height;
              }
            "
          >
            <AtomsContainerResizeBounding
              :width="layout.info.width"
              :min-width="layout.info.minWidth"
              :max-width="layout.info.maxWidth"
              :directions="'r'"
              class="ui--border --r"
              @update:width="
                (width) => {
                  layout.info.width = width;
                }
              "
            >
              <AtomsContainerRounded>
                <template #header>
                  <AtomsInputSizeField
                    :width="layout.info.width"
                    :height="layout.info.height"
                  />
                </template>
                <AtomsCoverInfo />
              </AtomsContainerRounded>
            </AtomsContainerResizeBounding>
            <AtomsContainerResizeBounding
              :directions="''"
              :style="[{ display: 'flex', width: '100%' }]"
            >
              <AtomsContainerRounded>
                <template #header>
                  <AtomsInputSizeField
                    :width="layoutSize.width - (layout.info.width ?? 0)"
                    :height="layout.info.height"
                  />
                </template>
                <AtomsDocumentationSetupGuide />
              </AtomsContainerRounded>
            </AtomsContainerResizeBounding>
          </AtomsContainerResizeBounding>
        </ClientOnly>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";

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
  Record<"info" | "cover" | "setupGuide", Partial<ContainerSize>>
> = ref({
  cover: {
    width: 480,
    minWidth: 360,
    maxWidth: 960,
  },
  setupGuide: {
    width: 480,
    minWidth: 440,
    maxWidth: 960,
  },
  info: {
    height: 360,
    minHeight: 0,
    maxHeight: 640,
    width: 800,
    minWidth: 580,
    maxWidth: 960,
  },
});

const layoutSize = ref({
  width: 0,
  height: 0,
});

const introWidth = computed(() => {
  return (
    layoutSize.value.width -
    (layout.value.cover.width ?? 0) -
    (layout.value.setupGuide.width ?? 0)
  );
});

const onSetLayout = (): void => {
  if (refLayout.value) {
    layoutSize.value = {
      width: refLayout.value.clientWidth,
      height: refLayout.value.clientHeight,
    };

    const hFactor = layoutSize.value.width > 1024 ? 3 : 2;

    // resize layout:
    layout.value.cover.width = Math.round(layoutSize.value.width / hFactor);

    layout.value.setupGuide.width = Math.round(
      layoutSize.value.width / hFactor,
    );
    layout.value.info.width = Math.round(layoutSize.value.width / 2.5);
    layout.value.info.height = Math.round(layoutSize.value.height / 3);
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
%container--normal {
  @include themify($app-themes) {
    background: themed("background", "secondary");
  }
}

.intro {
  display: flex;
  @include box(100%);
  @extend %container--normal;

  * {
    user-select: none;
  }

  &--container {
    @include box(100%);
    padding: 6px;
    box-sizing: border-box;
  }

  &__layout {
    display: flex;
    flex-direction: column;
    @include box(100%);
    @extend %container--normal;
    @include use-themed-border(all);
    @include use-border-radius(--xl);
    overflow: hidden;
  }
}

.ui {
  &--border {
    &.--l {
      @include use-themed-border(left);
    }

    &.--r {
      @include use-themed-border(right);
    }

    &.--t {
      @include use-themed-border(top);
    }

    &.--b {
      @include use-themed-border(bottom);
    }
  }
}
</style>
