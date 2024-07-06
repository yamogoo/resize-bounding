<template>
  <NuxtLink class="ui-link">
    <slot></slot>
  </NuxtLink>
</template>

<style lang="scss">
.ui {
  &-link {
    text-decoration: none;
    @include themify($app-themes) {
      color: themed("colors", "accent");
    }

    &:hover {
      @include themify($app-themes) {
        color: themed("text", "primary") !important;
      }
    }
  }
}
</style>
