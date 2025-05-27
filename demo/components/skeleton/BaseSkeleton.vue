<script setup lang="ts">
import { onMounted, ref } from "vue";
import g from "gsap";

const refShape = ref<HTMLDivElement | null>();

onMounted(() => {
  const el = refShape.value;
  if (el) onAnimate(el);
});

const onAnimate = (el: Element): void => {
  const width = el.clientWidth;

  g.fromTo(
    el,
    {
      x: -width,
    },
    {
      x: width,
      duration: 0.75,
      repeat: -1,
    },
  );
};
</script>

<template>
  <div class="skeleton">
    <div ref="refShape" class="skeleton__shape"></div>
  </div>
</template>

<style lang="scss">
@use "sass:map";

.skeleton {
  position: relative;
  border-radius: px2rem(map.get($roundness, "xs"));
  overflow: hidden;
  z-index: 1;
  cursor: wait;

  &__shape {
    position: absolute;
    inset: 0;
    z-index: 0;
    @include themify($themes) {
      $color-in: rgba(themed("label", "disabled"), 0.25);
      $color-out: rgba(themed("label", "disabled"), 0);
      background: linear-gradient(90deg, $color-out, $color-in, $color-out);
    }
  }
}
</style>
