<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

import { useLocaleStore } from "@/stores/locale";

import tokens from "@/tokens";

import type { ISize } from "@/shared/types";

import BlockContainer from "@/components/container/BlockContainer.vue";
import InstallGuide from "@/components/covers/InstallGuide.vue";
import MainCover from "@/components/covers/MainCover.vue";
import IntroCover from "@/components/covers/IntroCover.vue";
import InfoCover from "@/components/covers/InfoCover.vue";
import SetupGuide from "@/components/covers/SetupGuide.vue";
import SizeField from "@/components/controls/SizeField.vue";
import ThemeSwitch from "@/components/controls/ThemeSwitch.vue";
import LocaleMenu from "@/components/controls/LocaleMenu.vue";

const props = defineProps<Props>();

const { $t } = storeToRefs(useLocaleStore());

const layout = ref({
  ...tokens.layout,
});

watch(
  () => props.layoutSize,
  (layoutSize) => {
    const hFactor = layoutSize.width > tokens.breakpoints.lg ? 3 : 2;

    layout.value.setupGuide.width = Math.round(layoutSize.width / hFactor);
    layout.value.info.width = Math.round(layoutSize.width / 2);
    layout.value.info.height = Math.round(layoutSize.height / 2.5);
  },
  { deep: true, immediate: true },
);
</script>

<script lang="ts">
export interface Props {
  layoutSize: ISize;
}
</script>

<template>
  <ClientOnly>
    <div class="scroll-view">
      <div class="screen">
        <BlockContainer>
          <template #header>
            <SizeField
              :width="layout.cover.width"
              :height="layoutSize.height - (layout.info.height ?? 0)"
            />
          </template>
          <MainCover title="Resize Bounding">
            <template #controls>
              <ThemeSwitch />
              <LocaleMenu />
            </template>
          </MainCover>
        </BlockContainer>
      </div>
      <div class="screen">
        <BlockContainer class="intro-block">
          <template #header>
            <SizeField
              :width="layoutSize.width"
              :height="layoutSize.height - (layout.info.height ?? 0)"
              transparent
            />
          </template>
          <IntroCover
            :title="`${$t['intro-cover'].title}`"
            :description="`${$t['intro-cover'].title}`"
          />
        </BlockContainer>
      </div>
      <div class="screen">
        <BlockContainer>
          <template #header>
            <SizeField
              :width="layout.setupGuide.width"
              :height="layoutSize.height - (layout.info.height ?? 0)"
            />
          </template>
          <InstallGuide
            :title="`${$t['install-guide'].install}`"
            :links="[
              { name: 'npm i vue3-resize-bounding' },
              { name: 'npm i react-resize-bounding' },
            ]"
          />
        </BlockContainer>
      </div>
      <div class="screen">
        <BlockContainer>
          <SetupGuide />
        </BlockContainer>
      </div>
      <div class="screen">
        <BlockContainer>
          <template #header>
            <SizeField
              :width="layout.info.width"
              :height="layout.info.height"
            />
          </template>
          <InfoCover />
        </BlockContainer>
      </div>
    </div>
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

  .scroll-view {
    position: relative;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-snap-type: y mandatory;
  }

  .screen {
    /* position: relative; */
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100dvh - px2rem(map.get($spacing, "md")));
    scroll-snap-align: start;
  }
}
</style>
