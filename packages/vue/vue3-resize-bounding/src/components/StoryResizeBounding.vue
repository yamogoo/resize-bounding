<script setup lang="ts">
import { Emits, type Props } from "../../lib/components/ResizeBounding";

import type { EmittedFocusData } from "../../lib/shared/typings";
import ResizeBounding from "../../lib/components/ResizeBounding.vue";

import StoryResizeBoundingCover from "./StoryResizeBoundingCover.vue";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<LocalProps>(), {
  showCover: false,
  options: () => {
    return {
      knob: {
        show: true,
        activeAreaWidth: 12,
      },
    };
  },
});

const emit = defineEmits<{
  (e: Emits.UPDATE_WIDTH, width: number): void;
  (e: Emits.UPDATE_HEIGHT, height: number): void;
  (e: Emits.DRAG_START, dir: string): void;
  (e: Emits.DRAG_MOVE, dir: string): void;
  (e: Emits.DRAG_END, dir: string): void;
  (e: Emits.FOCUS, data: EmittedFocusData): void;
}>();
</script>

<script lang="ts">
export { type Props } from "../../lib/components/ResizeBounding";

interface LocalProps extends Props {
  showCover?: boolean;
}
</script>

<template>
  <ResizeBounding
    v-bind="props"
    @update:width="(width: number) => emit(Emits.UPDATE_WIDTH, width)"
    @update:height="(height: number) => emit(Emits.UPDATE_HEIGHT, height)"
    @drag:start="(dir: string) => emit(Emits.DRAG_START, dir)"
    @drag:move="(dir: string) => emit(Emits.DRAG_MOVE, dir)"
    @drag:end="(dir: string) => emit(Emits.DRAG_END, dir)"
    @focus="(args: EmittedFocusData) => emit(Emits.FOCUS, args)"
  >
    <template #knob>
      <slot name="knob"></slot>
    </template>
    <div class="resize-bounding-content">
      <div v-if="!showCover" class="resize-bounding-content__container">
        <h3>Slot</h3>
        <p>Place the subcomponent in the default slot</p>
      </div>
      <StoryResizeBoundingCover v-if="showCover" />
    </div>
  </ResizeBounding>
</template>

<style lang="scss">
@use "../assets/scss/utils.scss" as *;
@use "../assets/scss/typography.scss" as *;

.resize-bounding-content {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__container {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: px2rem(12px);
    width: 100%;
    height: 100%;
    padding: px2rem(24px);
    background-image: url("../assets/images/cutting-pattern.svg");
    background-repeat: repeat;
    background-size: px2rem(32px);

    p,
    h3 {
      font-family: $font-family;
      text-align: center;
      padding: 0;
      margin: 0;
      max-width: max-content;
      color: #c191ff;
      background-color: white;
    }

    h3 {
      font-size: px2em(13px);
      font-weight: 400;
      letter-spacing: 0.3%;
    }

    p {
      font-size: px2em(11px);
      letter-spacing: 0.3%;
    }
  }
}
</style>
