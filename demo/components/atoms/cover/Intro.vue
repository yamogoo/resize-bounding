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
    <div class="ui-main-intro--body">
      <!-- <h2 class="ui-main-intro__title" v-if="title">{{ title }}</h2> -->
      <p class="ui-main-intro__description" v-if="description">
        {{ description }}
      </p>
      <p class="ui-main-intro__description--sm">
        Supports Mouse & Touch Events
      </p>
    </div>
    <div class="ui-main-intro--footer">
      <AtomsGroupContent direction="h" alignment="start">
        <!-- <NuxtLink to="/">
          <img
            class="ui-main-intro__logo"
            src="/nuxt-logo--invert.svg"
            alt="nuxt logo"
          />
        </NuxtLink> -->
        <NuxtLink to="/">
          <img
            class="ui-main-intro__logo"
            src="/vue-logo--invert.svg"
            alt="vue logo"
          />
        </NuxtLink>
        <!-- <NuxtLink to="/">
          <img
            class="ui-main-intro__logo"
            src="/figma-logo--invert.svg"
            alt="figma logo"
          />
        </NuxtLink> -->
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
</script>

<style lang="scss">
.ui-main-intro {
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
    max-width: 640px;
    margin: auto;
  }

  &--footer {
    display: flex;
    width: 100%;
    flex-direction: row-reverse;
    gap: 20px;
  }

  &__title {
    @extend %title--sm;
  }

  &__description {
    @extend %text--lg;

    &--sm {
      @extend %text--sm;
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
