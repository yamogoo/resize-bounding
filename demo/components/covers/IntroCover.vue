<script setup lang="ts">
import {
  ref,
  onMounted,
  onUnmounted,
  type ComputedRef,
  computed,
  type CSSProperties,
} from "vue";
import { storeToRefs } from "pinia";

import { useLocaleStore } from "@/stores/locale";

import GProvider from "@/components/transition/GProvider.vue";
import Icon from "@/components/icons/Icon.vue";

const props = defineProps<Props>();

const { $t } = storeToRefs(useLocaleStore());

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
      <div class="ui-main-intro__body">
        <p v-if="description" class="ui-main-intro__description">
          {{ description }}
        </p>
      </div>
    </GProvider>
    <div class="ui-main-intro__footer">
      <div class="ui-main-intro__info-container">
        <p class="ui-main-intro__info-descriptor">
          {{ $t["intro-cover"].description }}
        </p>
        <div class="ui-main-intro__info-event-icons">
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

  & {
    @include box(100%);

    @include respond-above(lg) {
      padding: px2rem(
        map.get(
          map.get(map.get(map.get($layout, "cover"), "respond"), "desktop"),
          "padding"
        )
      );
    }

    @include respond-between(md, lg) {
      padding: px2rem(
        map.get(
          map.get(map.get(map.get($layout, "cover"), "respond"), "tablet"),
          "padding"
        )
      );
    }

    @include respond-below(md) {
      padding: px2rem(
        map.get(
          map.get(map.get(map.get($layout, "cover"), "respond"), "mobile"),
          "padding"
        )
      );
    }
  }

  &__body {
    display: flex;
    @include flex-col(center);
    gap: px2rem(map.get($gap, "xs"));
    @include box(100%, auto);
    min-width: px2rem(map.get(map.get($layout, "info"), "minContentWidth"));
    max-width: px2rem(map.get(map.get($layout, "info"), "maxContentWidth"));
    margin: auto;
  }

  &__footer {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    flex-direction: row-reverse;
    gap: map.get($gap, "xs");
    @include padding(left right, px2rem(map.get($spacing, "lg")));
    @include padding(top bottom, px2rem(map.get($spacing, "lg")));
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

    &-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: px2rem(map.get(map.get($layout, "info"), "minContentWidth"));
      max-width: px2rem(map.get(map.get($layout, "info"), "maxContentWidth"));
      padding-bottom: px2rem(map.get($spacing, "lg"));
    }

    &-descriptor {
      @extend %t__body__2;
      text-align: center;

      @include themify($themes) {
        color: themed("label", "inactive");
      }
      @extend %base-transition;
    }

    &-event-icons {
      display: flex;
      gap: px2rem(map.get($gap, "xl"));
      width: min-content;
      @include themify($themes) {
        color: themed("image", "watermark");
      }
      @extend %base-transition;
    }
  }
}
</style>
