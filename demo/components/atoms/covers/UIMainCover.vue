<template>
  <div
    class="ui-main-cover"
    :style="[
      {
        backgroundImage: `url(${imagePath})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      },
    ]"
  >
    <div class="ui-main-cover--body">
      <h1 class="ui-main-cover__title" v-if="title">{{ title }}</h1>
      <p class="ui-main-cover__description" v-if="description">
        {{ description }}
      </p>
    </div>
    <div class="ui-main-cover--footer">
      <UIGroup direction="h">
        <img
          class="ui-main-cover__logo"
          src="/vue-logo--invert.svg"
          alt="vue logo"
        />
        <img
          class="ui-main-cover__logo"
          src="/figma-logo--invert.svg"
          alt="figma logo"
        />
      </UIGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import UIGroup from "@/components/atoms/base/groups/UIGroup.vue";

interface Props {
  title?: string;
  description?: string;
  imagePath?: string;
}

defineProps<Props>();
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
    display: flex;
    width: 100%;
    flex-direction: row-reverse;
    gap: 20px;
  }

  &__title {
    @extend %title--lg;
  }

  &__description {
    @extend %text--xl;
  }

  &__title,
  &__description {
    text-align: center;

    @include themify($app-themes) {
      color: themed("text", "primary--invert");
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
