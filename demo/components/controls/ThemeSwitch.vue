<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { useConfigStore } from "@/stores/config";

import Switch from "./Switch.vue";

const { currentTheme } = storeToRefs(useConfigStore());
const { toggleTheme } = useConfigStore();

const colorMode = ref(false);

const onChangeTheme = () => {
  toggleTheme();
  colorMode.value = currentTheme.value === "light";
};
</script>

<template>
  <Switch
    data-testid="theme-switch"
    :state="colorMode"
    aria-label="change-theme"
    @update:state="onChangeTheme"
  />
</template>
