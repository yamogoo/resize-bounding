<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { storeToRefs } from "pinia";

import { useLayoutStore } from "@/stores/layout";

import tokens from "@/tokens";

import type { ISize } from "@/shared/types";

import ResizeBounding from "@/components/container/ResizeBounding.vue";
import BlockContainer from "@/components/container/BlockContainer.vue";
import CoverGuide from "@/components/covers/Guide.vue";
import MainCover from "@/components/covers/MainCover.vue";
import IntroCover from "@/components/covers/IntroCover.vue";
import InfoCover from "@/components/covers/InfoCover.vue";
import SetupGuide from "@/components/covers/SetupGuide.vue";
import SizeField from "@/components/controls/SizeField.vue";
import ThemeSwitch from "@/components/controls/ThemeSwitch.vue";

const props = defineProps<Props>();

const { isTabletLayout } = storeToRefs(useLayoutStore());

const layout = ref({
  ...tokens.layout,
});

watch(
  () => [props.layoutSize, layout.value.cover],
  () => {
    const hFactor = props.layoutSize.width > tokens.breakpoints.lg ? 3 : 2;

    layout.value.setupGuide.width = !isTabletLayout.value
      ? Math.round(props.layoutSize.width / hFactor)
      : props.layoutSize.width - layout.value.cover.width;
    layout.value.info.width = Math.round(props.layoutSize.width / 2);
    layout.value.info.height = Math.round(props.layoutSize.height / 2.5);
  },
  { deep: true, immediate: true },
);

const introWidth = computed(() => {
  return (
    props.layoutSize.width -
    (layout.value.cover.width ?? 0) -
    (layout.value.setupGuide.width ?? 0)
  );
});
</script>

<script lang="ts">
export interface Props {
  layoutSize: ISize;
}
</script>

<template>
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
          <MainCover title="Resize Bounding" />
        </BlockContainer>
      </ResizeBounding>
      <BlockContainer v-if="!isTabletLayout" class="intro-block">
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
        :directions="!isTabletLayout ? 'l' : null"
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
          >
            <template #controls>
              <ThemeSwitch />
            </template>
          </CoverGuide>
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
</template>

<style lang="scss" scoped>
@use "sass:map";

.main {
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
