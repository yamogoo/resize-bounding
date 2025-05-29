<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";

import GProvider from "@/components/transition/GProvider.vue";
import Badge from "@/components/badges/Badge.vue";
import MainLogo from "@/components/logos/MainLogo.vue";

import { useConfigStore } from "@/stores/config";

const { currentPackageVersion } = storeToRefs(useConfigStore());

withDefaults(defineProps<Props>(), {
  isDateShown: false,
});

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});

onUnmounted(() => {
  isMounted.value = false;
});
</script>

<script lang="ts">
export interface Props {
  title: string;
  description?: string;
  isDateShown?: boolean;
}
</script>

<template>
  <div class="ui-main-cover">
    <div class="ui-main-cover__controls">
      <slot name="controls"></slot>
    </div>
    <div class="ui-main-cover__body">
      <GProvider
        :show="isMounted"
        :before-enter="{ opacity: 0, scale: 0.5 }"
        :enter="{
          opacity: 1,
          scale: 1,
          ease: 'power4.out',
          duration: 0.75,
        }"
      >
        <MainLogo :descriptor="title"></MainLogo>
      </GProvider>
      <GProvider
        :show="isMounted"
        :before-enter="{ opacity: 0, y: 40 }"
        :enter="{
          opacity: 1,
          y: 0,
          ease: 'power4.out',
          duration: 0.75,
        }"
      >
        <p v-if="description" class="ui-main-cover__description">
          {{ description }}
        </p>
      </GProvider>
    </div>
    <GProvider
      :show="isMounted"
      :before-enter="{ opacity: 0, y: 80 }"
      :enter="{
        opacity: 1,
        y: 0,
        ease: 'power4.out',
        duration: 0.5,
        delay: 0.35,
      }"
    >
      <div
        class="ui-main-cover__footer"
        :direction="'horizontal'"
        :alignment="'center'"
        data-testid="ui-main-cover-footer"
      >
        <Badge :label="'version'" :value="`${currentPackageVersion}`"></Badge>
        <span v-if="isDateShown" class="ui-main-cover__date">2024-2025</span>
      </div>
    </GProvider>
  </div>
</template>

<style lang="scss">
@use "sass:map";

.ui-main-cover {
  display: grid;
  grid-template-rows: 1fr auto;
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

  &__body {
    @include box(100%, auto);
  }

  &__footer {
    width: 100%;
  }

  &__body,
  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__description {
    @extend %t__body__1;
  }

  &__description {
    text-align: center;

    @include themify($themes) {
      color: themed("label", "primary");
    }
    @extend %base-transition;
  }

  .ui-goup {
    @include respond-above(lg) {
      padding: px2rem(
        map.get(
          map.get(map.get(map.get($layout, "cover"), "respond"), "desktop"),
          "groupPadding"
        )
      );
    }

    @include respond-between(md, lg) {
      padding: px2rem(
        map.get(
          map.get(map.get(map.get($layout, "cover"), "respond"), "tablet"),
          "groupPadding"
        )
      );
    }

    @include respond-below(md) {
      padding: px2rem(
        map.get(
          map.get(map.get(map.get($layout, "cover"), "respond"), "mobile"),
          "groupPadding"
        )
      );
    }
  }

  &__logo {
    @include respond-above(lg) {
      padding: px2rem(
        map.get(
          map.get(map.get(map.get($layout, "cover"), "respond"), "desktop"),
          "logoSize"
        )
      );
    }

    @include respond-between(md, lg) {
      padding: px2rem(
        map.get(
          map.get(map.get(map.get($layout, "cover"), "respond"), "tablet"),
          "logoSize"
        )
      );
    }

    @include respond-below(md) {
      padding: px2rem(
        map.get(
          map.get(map.get(map.get($layout, "cover"), "respond"), "mobile"),
          "logoSize"
        )
      );
    }
  }

  &__date {
    @extend %t__body__1;
    @include themify($themes) {
      color: themed("label", "secondary");
    }
    @extend %base-transition;
  }

  &__controls {
    position: absolute;
    top: px2rem(map.get($spacing, "md"));
    right: px2rem(map.get($spacing, "md"));
  }
}
</style>
