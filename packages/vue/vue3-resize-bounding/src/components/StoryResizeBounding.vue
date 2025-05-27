<script setup lang="ts">
import { Emits, type Props } from "../../lib/components/ResizeBounding";

import ResizeBounding from "../../lib/components/ResizeBounding.vue";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<Props>(), {
  options: () => {
    return {
      knob: {
        show: true,
        activeAreaWidth: 12,
      },
    };
  },
});

// Define emits
const emit = defineEmits<{
  (e: Emits.UPDATE_WIDTH, width: number): void;
  (e: Emits.UPDATE_HEIGHT, height: number): void;
  (e: Emits.DRAG_START, dir: string): void;
  (e: Emits.DRAG_MOVE, dir: string): void;
  (e: Emits.DRAG_END, dir: string): void;
  (e: Emits.FOCUS, data: { state: boolean; direction: string }): void;
}>();
</script>

<script lang="ts">
export { type Props } from "../../lib/components/ResizeBounding";
</script>

<template>
  <ResizeBounding
    v-bind="props"
    @update:width="(width) => emit(Emits.UPDATE_WIDTH, width)"
    @update:height="(height) => emit(Emits.UPDATE_HEIGHT, height)"
    @drag:start="(dir) => emit(Emits.DRAG_START, dir)"
    @drag:move="(dir) => emit(Emits.DRAG_MOVE, dir)"
    @drag:end="(dir) => emit(Emits.DRAG_END, dir)"
    @focus="(isFocused) => emit(Emits.FOCUS, isFocused)"
  >
    <div class="resize-bounding-content">
      <div class="resize-bounding-content__container">
        <h3>Slot</h3>
        <p>Place the subcomponent in the default slot</p>
      </div>
    </div>
  </ResizeBounding>
</template>

<style lang="scss">
.resize-bounding-content {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  &__container {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: 100%;
    padding: 24px;
    background-image: url("../assets/cutting-pattern.svg");
    background-repeat: repeat;
    background-size: 32px;

    p,
    h3 {
      font-family: "Roboto";
      text-align: center;
      padding: 0;
      margin: 0;
      max-width: max-content;
      color: #c191ff;
      background-color: white;
    }

    h3 {
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 0.3%;
    }

    p {
      font-size: 11px;
      letter-spacing: 0.3%;
    }
  }
}
</style>
