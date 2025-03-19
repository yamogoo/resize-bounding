<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, useId } from "vue";
import g from "gsap";

import { useTimeout } from "@/composables/useTimeout";

import tokens from "@/tokens";

interface Props {
  size?: BlockContainerSize;
  title?: string;
  imagePath?: string;
  imageDescription?: string;
}

withDefaults(defineProps<Props>(), {
  size: "md",
  imageDescription: "image",
});

const SPEED_CORRECTION_FACTOR = 500;
const EFFECT_TIME_TO_RESET = 75;

const id = useId();

const refRoot = ref<HTMLDivElement | null>();
const refEffect = ref<HTMLDivElement | null>();

const isEffectShown = ref(false);

let lastTime = 0;
let lastX = 0;
let lastY = 0;
const mouseSpeed = ref(0);

const { minSize, maxSize, opacityMin, opacityMax } = tokens.speedEffect;

const { start: onResetEffect, stop } = useTimeout(() => {
  init(opacityMin);
}, EFFECT_TIME_TO_RESET);

const calculateMouseSpeed = (e: PointerEvent | MouseEvent): void => {
  const currentTime = Date.now();
  const currentX = e.clientX;
  const currentY = e.clientY;

  if (lastTime !== 0) {
    const timeDiff = (currentTime - lastTime) / 1000;

    const distance = Math.sqrt(
      Math.pow(currentX - lastX, 2) + Math.pow(currentY - lastY, 2),
    );

    mouseSpeed.value = distance / timeDiff;
  }

  lastX = currentX;
  lastY = currentY;
  lastTime = currentTime;
};

const init = (opacity = 0): void => {
  const effect = refEffect.value;
  if (!effect) return;

  effect.style.opacity = `${opacity}`;
  effect.style.width = `${minSize}px`;
  effect.style.height = `${minSize}px`;
};

const onPointerMove = (e: PointerEvent): void => {
  isEffectShown.value = true;
  stop();

  const { clientX: pointerX, clientY: pointerY } = e;

  const root = refRoot.value;
  const effect = refEffect.value;
  if (!(effect && root)) return;

  calculateMouseSpeed(e);
  const { left, top, width, height } = root.getBoundingClientRect();

  const x = pointerX - left - width / 2;
  const y = pointerY - top - height / 2;

  const speed = mouseSpeed.value / SPEED_CORRECTION_FACTOR;
  const calculatedSize = minSize * speed;

  const actualSize =
    calculatedSize < minSize
      ? minSize
      : calculatedSize > maxSize
        ? maxSize
        : calculatedSize;

  const opacity =
    speed > 1 ? opacityMax : speed < opacityMin ? opacityMin : speed;

  effect.style.width = `${actualSize}px`;
  effect.style.height = `${actualSize}px`;
  effect.style.opacity = `${opacity}`;
  effect.style.transform = `translate(${x}px, ${y}px)`;

  nextTick(() => onResetEffect());
};

const onPointerEnter = (): void => {
  init(0);
  refRoot.value!.addEventListener("pointermove", onPointerMove);
};

const onPointerLeave = (): void => {
  isEffectShown.value = false;

  const root = refRoot.value;
  if (!(refEffect.value && root)) return;

  root.removeEventListener("pointermove", onPointerMove);
};

const addEventListeners = (): void => {
  if (refRoot.value) {
    refRoot.value.addEventListener("pointerenter", onPointerEnter);
    refRoot.value.addEventListener("pointerleave", onPointerLeave);
  }
};

const removeEventListeners = (): void => {
  if (refRoot.value) {
    refRoot.value.removeEventListener("pointerenter", onPointerEnter);
    refRoot.value.removeEventListener("pointerleave", onPointerLeave);
  }
};

onMounted(() => {
  init(0);
  addEventListeners();
});

onUnmounted(() => {
  stop();
  removeEventListeners();
});

/* * * Animations * * */

const onEffectEnter = (el: Element, done: () => void): void => {
  g.fromTo(
    el,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.75,
      ease: "power4.out",
      onComplete: done,
    },
  );
};

const onEffectLeave = (el: Element, done: () => void): void => {
  g.to(el, {
    opacity: 0,
    duration: 0.75,
    ease: "power4.out",
    onComplete: done,
  });
};
</script>

<script lang="ts">
export type BlockContainerSize = keyof typeof tokens.blockContainer;
</script>

<template>
  <div class="ui-block-container" :class="[size]">
    <div ref="refRoot" class="ui-block-container--container">
      <Transition :css="false" @enter="onEffectEnter" @leave="onEffectLeave">
        <div
          v-show="isEffectShown"
          :id
          ref="refEffect"
          class="ui-block-container--effect"
        ></div>
      </Transition>
      <div class="ui-block-container__control-panel">
        <slot name="header"></slot>
      </div>
      <slot></slot>
      <div
        v-if="imagePath"
        class="ui-block-container--cover"
        :style="[
          {
            backgroundImage: `url(${imagePath})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          },
        ]"
      ></div>
    </div>
  </div>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineStyles($map: $blockContainer) {
  @each $size, $val in $map {
    $padding: px2rem(map.get($val, "padding"));
    $roundness: px2rem(map.get($val, "roundness"));

    & {
      &.#{$size} {
        padding: $padding;

        .ui-block-container--container {
          border-radius: $roundness;
        }
      }
    }
  }
}

.ui-block-container {
  position: relative;
  @include box(100%);
  overflow: hidden;

  @include defineStyles();

  &--effect {
    position: absolute;
    @include box(720px);
    overflow: hidden;
    pointer-events: none;
    @include transition(width height opacity, 475ms, ease-out);

    @include themify($themes) {
      background: radial-gradient(
        circle,
        rgba(colors.$accent-225, 0.25) 0%,
        rgba(colors.$accent-225, 0) 35%
      );
    }
  }

  &--container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    @include box(100%);
    overflow: hidden;
    @extend %base-transition;

    @include themify($themes) {
      background: themed("background", "primary");
    }
    @include use-themed-border(all, "primary");
  }

  &:hover {
    .ui-block-container--container {
      @include use-themed-border(all, "primaryFocused");
    }
  }

  &__control-panel {
    position: absolute;
    top: px2rem(map.get($spacing, "md"));
    z-index: 1;
  }
}
</style>
