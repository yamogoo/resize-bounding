<template>
  <div
    class="ui-main-intro"
    :style="[
      {
        backgroundImage: `url(${imagePath})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      },
    ]"
  >
    <AtomsTransitionGProvider
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
        <p class="ui-main-intro__description" v-if="description">
          {{ description }}
        </p>
        <AtomsGroupContent
          class="ui-main-intro__info"
          :direction="'v'"
          :alignment="'center'"
        >
          <p class="ui-main-intro__description--sm">
            supports mouse & touch events
          </p>
          <div class="ui-main-intro__event-icons">
            <NuxtIcon :name="'mouse'" alt="mouse events" />
            <NuxtIcon :name="'touch'" alt="touch events" />
          </div>
        </AtomsGroupContent>
      </div>
    </AtomsTransitionGProvider>
    <div class="ui-main-intro--footer">
      <AtomsGroupContent direction="h" alignment="start">
        <NuxtLink to="/">
          <img
            class="ui-main-intro__logo"
            src="/vue-logo--invert.svg"
            alt="vue logo"
          />
        </NuxtLink>
      </AtomsGroupContent>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  description?: string;
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
.ui-main-intro {
  position: relative;
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
    gap: 32px;
    @include box(100%, auto);
    max-width: 640px;
    margin: auto;
  }

  &--footer {
    position: absolute;
    display: flex;
    bottom: 0;
    right: 0;
    width: 100%;
    flex-direction: row-reverse;
    gap: 20px;
    @include padding-h(20px);
    @include padding-v(20px);
  }

  &__title {
    @extend %title--sm;
  }

  &__description {
    @extend %text--lg;

    &--sm {
      // @extend %text--sm;
      @include use-font-size(--xxs);
      text-transform: uppercase;
      letter-spacing: 1.3px;
    }
  }

  &__title,
  &__description,
  &__description--sm {
    text-align: center;

    @include themify($app-themes) {
      color: $c-white;
    }
  }

  &__info {
    opacity: 0.75;
  }

  &__event-icons {
    display: flex;
    gap: 12px;
    color: $c-white;

    .nuxt-icon {
      @include box(40px);

      svg {
        @include box(100%);
      }
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
      @include box(44px);
    }

    @include respond-below(md) {
      @include box(32px);
    }
  }
}
</style>
