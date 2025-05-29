import { computed, ref, type ComputedRef } from "vue";
import { defineStore } from "pinia";

import { useTheme } from "@/composables/useTheme";

import type { Theme, Themes } from "@/shared/types";

export const themes: Themes = ["light", "dark"];

export const DEFAULT_THEME = import.meta.env.VITE_UI_LOCAL_THEME as
  | Theme
  | undefined;

export const useConfigStore = defineStore("config", () => {
  const {
    theme: currentTheme,
    isSystemThemeEnabled,
    setTheme,
    toggleTheme,
    setIsSystemThemeEnabled,
  } = useTheme(DEFAULT_THEME ?? "dark", { selector: "html" });

  const getSid: ComputedRef<number> = computed(() => {
    return themes.findIndex((theme) => theme === currentTheme.value);
  });

  const currentPackageVersion = ref("");
  const setCurrentPackageVersion = (version: string) =>
    (currentPackageVersion.value = version);

  return {
    currentTheme,
    isSystemThemeEnabled,
    setTheme,
    toggleTheme,
    setIsSystemThemeEnabled,
    getSid,
    currentPackageVersion,
    setCurrentPackageVersion,
  };
});
