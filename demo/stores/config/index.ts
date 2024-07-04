import { defineStore } from "pinia";

import type { SettingsStoreState } from "./types";
import { Themes } from "../../shared/types";

const defaults = {
  theme: localStorage.getItem("theme") ?? Themes.DARK,
};

export const useConfigStore = defineStore("config", {
  state: (): SettingsStoreState => ({
    app: {
      themes: {
        themes: [Themes.LIGHT, Themes.DARK],
        current: defaults.theme,
      },
    },
  }),
  getters: {
    /**
     * @description The current theme of the app
     */
    appTheme(state): { theme: string; id: number } {
      const id = this.app.themes.themes.findIndex(
        (el) => el === this.app.themes.current,
      );
      return { theme: state.app.themes.current, id };
    },
  },
  actions: {
    /**
     * @description Set the app theme
     */
    setAppTheme(state: boolean): void {
      const theme = this.app.themes.themes[Number(state)];
      this.app.themes.current = theme;
      localStorage.setItem("theme", theme);
    },
  },
});
