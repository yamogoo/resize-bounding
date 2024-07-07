<template>
  <InteractiveGrid />
</template>

<script setup lang="ts">
import InteractiveGrid from "@/components/InteractiveGrid.vue";
// import MyResizeBounding from "@/components/MyResizeBounding.vue";
// import StylizedKnob from "@/components/StylizedKnob.vue";
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
</style>
