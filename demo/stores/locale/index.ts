import { computed } from "vue";
import { defineStore } from "pinia";

import { useTypedLocalStorage } from "@/composables/useTypedLocalStorage";

import type { Locale } from "@/shared/types";

import locales from "@/locales";

const DEFAULT_LOCALE = import.meta.env.VITE_LOCALE;

export const useLocaleStore = defineStore("locale-store", () => {
  const currentLocale = useTypedLocalStorage<Locale>("LOCALE", DEFAULT_LOCALE);

  const setLocale = (locale: Locale) => {
    currentLocale.value = locale;
  };

  const $t = computed(() => locales[currentLocale.value]);

  return {
    currentLocale,
    setLocale,
    $t,
  };
});
