/// <reference types="vite/client" />

interface ImportMetaEnv {
  /* * * Package.json * * */

  readonly APP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
