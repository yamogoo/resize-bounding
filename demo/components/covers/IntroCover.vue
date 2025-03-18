<script setup lang="ts">
import {
  defineProps,
  ref,
  onMounted,
  onUnmounted,
  type ComputedRef,
  computed,
  type CSSProperties,
} from "vue";

import GProvider from "@/components/transition/GProvider.vue";
import Icon from "@/components/icons/Icon.vue";

const props = defineProps<Props>();

const { imagePath } = props;

const isMounted = ref(false);

const computedStyle: ComputedRef<CSSProperties> = computed(() => {
  return imagePath
    ? {
        backgroundImage: `url(${imagePath})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }
    : {};
});

onMounted(() => {
  isMounted.value = true;
});

onUnmounted(() => {
  isMounted.value = false;
});
</script>

<script lang="ts">
export interface Props {
  title?: string;
  description?: string;
  imagePath?: string;
  isLogosShown?: boolean;
}
</script>

<template>
  <div class="ui-main-intro" :style="computedStyle">
    <GProvider
      :show="isMounted"
      :before-enter="{ opacity: 0, scale: 1.25 }"
      :enter="{
        opacity: 1,
        scale: 1,
        ease: 'power4.out',
        duration: 0.5,
        delay: 0.75,
      }"
    >
      <div class="ui-main-intro--body">
        <p v-if="description" class="ui-main-intro__description">
          {{ description }}
        </p>
      </div>
    </GProvider>
    <div class="ui-main-intro--footer">
      <div class="ui-main-intro__info">
        <p class="ui-main-intro__info__descriptor">
          supports mouse & touch events
        </p>
        <div class="ui-main-intro__info__event-icons">
          <Icon
            data-testid="mouse-icon"
            :name="'computerMouse_fill_200'"
            :size="'md'"
            alt="mouse events"
          />
          <Icon
            data-testid="touch-icon"
            :name="'gestureTap_fill_200'"
            :size="'md'"
            alt="touch events"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "sass:map";

.ui-main-intro {
  position: relative;
  display: grid;
  grid-template-rows: 1fr auto;

  @include themify($themes) {
    background-color: themed("background", "cover");
  }
  @extend %base-transition;

  & {
    @include box(100%);

    @include respond-above(lg) {
      padding: map.get(
        map.get(map.get(map.get($layout, "cover"), "respond"), "desktop"),
        "padding"
      );
    }

    @include respond-between(md, lg) {
      padding: map.get(
        map.get(map.get(map.get($layout, "cover"), "respond"), "tablet"),
        "padding"
      );
    }

    @include respond-below(md) {
      padding: map.get(
        map.get(map.get(map.get($layout, "cover"), "respond"), "mobile"),
        "padding"
      );
    }
  }

  &--body {
    display: flex;
    @include flex-col(center);
    gap: map.get($gap, "xs");
    @include box(100%, auto);
    max-width: 480px;
    margin: auto;
  }

  &--footer {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0;
    right: 0;
    width: 100%;
    flex-direction: row-reverse;
    gap: map.get($gap, "xs");
    @include padding(left right, map.get($spacing, "lg"));
    @include padding(top bottom, map.get($spacing, "lg"));
  }

  &__description {
    @extend %t__body__1;
    text-align: center;

    @include themify($themes) {
      color: themed("label", "secondary");
    }
    @extend %base-transition;
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: map.get($spacing, "lg");

    &__descriptor {
      @extend %t__body__2;
      text-align: center;

      @include themify($themes) {
        color: themed("label", "inactive");
      }
      @extend %base-transition;
    }

    &__event-icons {
      display: flex;
      gap: 12px;
      @include themify($themes) {
        color: themed("image", "watermark");
      }
      @extend %base-transition;
    }
  }
}
</style>
