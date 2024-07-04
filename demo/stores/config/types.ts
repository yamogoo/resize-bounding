interface AppSettings {
  themes: AppThemes;
}

interface AppThemes {
  themes: Array<string>;
  current: string;
}

export interface SettingsStoreState {
  app: AppSettings;
}
