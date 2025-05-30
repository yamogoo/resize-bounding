<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useLocaleStore } from "@/stores/locale";

import locales from "@/locales";
import type { Locale } from "@/shared/types";

import BaseDropdown from "./BaseDropdown.vue";
import BaseOptions from "./BaseOptions.vue";

const { currentLocale } = storeToRefs(useLocaleStore());
const { setLocale } = useLocaleStore();

const localeKeys = Object.keys(locales) as Array<Locale>;

const onSelectKey = (key: Locale) => {
  setLocale(key);
};
</script>

<template>
  <BaseDropdown
    class="locale-dropdown"
    :value="currentLocale.toUpperCase()"
    :close-on-option-click="true"
  >
    <BaseOptions
      :value="currentLocale"
      :items="localeKeys"
      @select="onSelectKey"
    >
      <template #default="{ value }">
        {{ `${value}`.toUpperCase() }}
      </template>
    </BaseOptions>
  </BaseDropdown>
</template>

<style lang="scss">
.locale-dropdown {
  width: px2rem(64px);
}
</style>
