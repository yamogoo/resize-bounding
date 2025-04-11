<script setup lang="ts">
import { useHead, useRuntimeConfig } from "#imports";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

import tokens from "@/tokens";

import ResizeBounding from "@/components/container/ResizeBounding.vue";
import BlockContainer from "@/components/container/BlockContainer.vue";
import CoverGuide from "@/components/covers/Guide.vue";
import MainCover from "@/components/covers/MainCover.vue";
import IntroCover from "@/components/covers/IntroCover.vue";
import InfoCover from "@/components/covers/InfoCover.vue";
import SetupGuide from "@/components/covers/SetupGuide.vue";
import SizeField from "@/components/controls/SizeField.vue";

const runtimeConfig = useRuntimeConfig();

useHead({
  title: runtimeConfig.public.appTitle,
  meta: [
    {
      name: "description",
      content: runtimeConfig.public.appDescription,
    },
  ],
});

const isMounted = ref(false);

const refLayout = ref<HTMLDivElement | null>(null);

const layout = ref({
  ...tokens.layout,
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

    const hFactor = layoutSize.value.width > tokens.breakpoints.lg ? 3 : 2;

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

<template>
  <main class="main page">
    <div class="main__container">
      <div ref="refLayout" class="main__layout">
        <ClientOnly>
          <ResizeBounding
            data-testid="layout-resizer-top"
            :directions="''"
            :style="{ display: 'flex', height: '100%' }"
          >
            <ResizeBounding
              data-testid="layout-cover"
              :width="layout.cover.width"
              :min-width="layout.cover.minWidth"
              :max-width="layout.cover.maxWidth"
              :directions="'r'"
              class="ui_border_r"
              :style="[{ display: 'flex' }]"
              @update:width="
                (width) => {
                  layout.cover.width = width;
                }
              "
            >
              <BlockContainer>
                <template #header>
                  <SizeField
                    :width="layout.cover.width"
                    :height="layoutSize.height - (layout.info.height ?? 0)"
                  />
                </template>
                <MainCover
                  title="Resize Bounding"
                  :vue-version="runtimeConfig.public.productVueVersion"
                  :react-version="runtimeConfig.public.productReactVersion"
                />
              </BlockContainer>
            </ResizeBounding>
            <BlockContainer class="intro-block">
              <template #header>
                <SizeField
                  :width="introWidth"
                  :height="layoutSize.height - (layout.info.height ?? 0)"
                  transparent
                />
              </template>
              <IntroCover
                :title="'Supports Mouse & Touch Events'"
                description="Resize Bounding is a simple, highly customizable Vue3 & React component that allows you to intuitively resize nested content using draggable border panels"
              />
            </BlockContainer>
            <ResizeBounding
              :width="layout.setupGuide.width"
              :min-width="layout.setupGuide.minWidth"
              :max-width="layout.setupGuide.maxWidth"
              :directions="'l'"
              class="ui_border_l"
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
              <BlockContainer>
                <template #header>
                  <SizeField
                    :width="layout.setupGuide.width"
                    :height="layoutSize.height - (layout.info.height ?? 0)"
                  />
                </template>
                <CoverGuide
                  :links="[
                    { name: 'npm i vue3-resize-bounding' },
                    { name: 'npm i react-resize-bounding' },
                  ]"
                />
              </BlockContainer>
            </ResizeBounding>
          </ResizeBounding>
          <ResizeBounding
            data-testid="layout-info"
            :height="layout.info.height"
            :min-height="layout.info.minHeight"
            :max-height="layout.info.maxHeight"
            :directions="'t'"
            class="ui_border_t"
            :style="{ display: 'flex', width: '100%' }"
            @update:height="
              (height) => {
                layout.info.height = height;
              }
            "
          >
            <ResizeBounding
              :width="layout.info.width"
              :min-width="layout.info.minWidth"
              :max-width="layout.info.maxWidth"
              :directions="'r'"
              class="ui_border_r"
              @update:width="
                (width) => {
                  layout.info.width = width;
                }
              "
            >
              <BlockContainer>
                <template #header>
                  <SizeField
                    :width="layout.info.width"
                    :height="layout.info.height"
                  />
                </template>
                <InfoCover />
              </BlockContainer>
            </ResizeBounding>
            <ResizeBounding
              :directions="''"
              :style="{ display: 'flex', width: '100%' }"
            >
              <BlockContainer>
                <SetupGuide />
              </BlockContainer>
            </ResizeBounding>
          </ResizeBounding>
        </ClientOnly>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@use "sass:map";

.main {
  display: flex;
  @include box(100%);
  @extend %base-transition;

  * {
    user-select: none;
  }

  &__container {
    @include box(100%);
    padding: px2rem(map.get($mainContainer, "padding"));
    box-sizing: border-box;
  }

  &__layout {
    display: flex;
    flex-direction: column;
    @include box(100%);
    overflow: hidden;
  }

  .layout-resizer-top {
    min-height: px2rem(map.get(map.get($layout, "topResizer"), "minHeight"));
  }

  .intro-block {
    .ui-block-container--container {
      @include themify($themes) {
        background-color: themed("background", "cover");
      }
    }
  }
}
/* 
.ui {
  &_border {
    &_l {
      @include use-themed-border(left, "primary");
    }

    &_r {
      @include use-themed-border(right, "primary");
    }

    &_t {
      @include use-themed-border(top, "primary");
    }

    &_b {
      @include use-themed-border(bottom, "primary");
    }
  }
} */
</style>
