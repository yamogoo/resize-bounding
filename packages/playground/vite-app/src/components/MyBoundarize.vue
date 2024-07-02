<template>
  <MyBoundarize v-bind="$attrs">
    <slot></slot>
  </MyBoundarize>
</template>

<script setup lang="ts">
import MyBoundarize from "vue3-boundarize";
</script>
