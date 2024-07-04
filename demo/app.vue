<template>
  <main :class="['app', { 'theme-light': true }]">
    <NuxtPage />
  </main>
</template>

<script lang="ts"></script>

<style lang="scss">
#app,
body,
#__nuxt {
  @include box(100vw, 100vh);
  margin: 0;
  padding: 0;
  font-family: "Roboto";
  overflow: hidden;

  * {
    box-sizing: border-box;
  }
}
</style>
