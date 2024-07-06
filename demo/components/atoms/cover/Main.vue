<template>
  <div class="ui-main-cover">
    <div class="ui-main-cover--body">
      <AtomsTransitionGProvider
        :show="isMounted"
        :before-enter="{ opacity: 0, scale: 0.5, y: 80 }"
        :enter="{
          opacity: 1,
          scale: 1,
          y: 0,
          ease: 'power4.out',
          duration: 0.5,
        }"
      >
        <NuxtLink to="/">
          <img
            class="ui-main-cover__logo"
            src="/boundarize.svg"
            alt="vue logo"
          />
        </NuxtLink>
      </AtomsTransitionGProvider>
      <AtomsTransitionGProvider
        :show="isMounted"
        :beforeEnter="{ opacity: 0, y: 80 }"
        :enter="{
          opacity: 1,
          y: 0,
          ease: 'power4.out',
          duration: 0.5,
          delay: 0.25,
        }"
      >
        <h1
          v-if="isMounted && title"
          ref="refTitle"
          class="ui-main-cover__title"
        >
          {{ title }}
        </h1>
      </AtomsTransitionGProvider>
      <AtomsTransitionGProvider
        :show="isMounted"
        :beforeEnter="{ opacity: 0, y: 40 }"
        :enter="{
          opacity: 1,
          y: 0,
          ease: 'power4.out',
          duration: 0.5,
        }"
      >
        <p
          ref="refDescription"
          class="ui-main-cover__description"
          v-if="description"
        >
          {{ description }}
        </p>
      </AtomsTransitionGProvider>
    </div>
    <AtomsGroupContent
      class="ui-main-cover--footer"
      direction="h"
      alignment="center"
      data-testid="ui-main-cover-footer"
    >
      <AtomsGroupContent direction="v" alignment="center">
        <AtomsBadgeVersion :version />
        <span class="ui-main-cover__date">2024</span>
      </AtomsGroupContent>
    </AtomsGroupContent>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  description?: string;
  version?: string;
  imagePath?: string;
}

defineProps<Props>();

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});

onUnmounted(() => {
  isMounted.value = false;
});
</script>

<style lang="scss">
.ui-main-cover {
  display: grid;
  grid-template-rows: 1fr auto;
  @include box(100%);

  @include respond-above(lg) {
    padding: 40px;
  }

  @include respond-between(md, lg) {
    padding: 32px;
  }

  @include respond-below(md) {
    padding: 20px;
  }

  &--body {
    display: flex;
    @include flex-col(center);
    @include box(100%, auto);
  }

  &--footer {
    width: 100%;
  }

  &__title {
    @extend %title--sm;
  }

  &__description {
    @extend %text--lg;
  }

  &__title,
  &__description {
    text-align: center;

    @include themify($app-themes) {
      color: themed("text", "primary");
    }
  }

  .ui-goup {
    @include respond-above(md) {
      padding: 20px;
    }

    @include respond-below(md) {
      padding: 12px;
    }
  }

  &__logo {
    @include respond-above(md) {
      @include box(96px);
    }

    @include respond-below(md) {
      @include box(88px);
    }
  }

  &__date {
    @include use-font-size(--xs);
    @include themify($app-themes) {
      color: themed("text", "secondary");
    }
  }
}
</style>
