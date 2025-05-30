export enum LocalStorageKeys {
  "LOCALE",
  "THEME",
  "IS_SYSTEM_THEME_ENABLED",
}

export type LocalStorageKey = keyof typeof LocalStorageKeys;
