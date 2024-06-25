<template>
  <Example />
</template>

<script setup lang="ts">
import Example from "./examples/Example.vue";
</script>

<style lang="scss">
#app,
body {
  @include box(100vw, 100vh);
  margin: 0;
  padding: 0;
  font-family: "Roboto";
  overflow: hidden;

  * {
    box-sizing: border-box;
  }
}

h1 {
  font-size: 44px;
  font-weight: 400;
}

h3 {
  font-size: 28px;
  font-weight: 400;
}
</style>
