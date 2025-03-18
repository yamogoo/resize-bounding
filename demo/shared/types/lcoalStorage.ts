export enum LocalStorageKeys {
  "THEME",
  "IS_SYSTEM_THEME_ENABLED",
}

export type LocalStorageKey = keyof typeof LocalStorageKeys;
