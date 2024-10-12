/// <reference types="vite/client" />
type ImportMetaEnv = {

  /** Api base url. */
  readonly VITE_API_URL: string;

  // more env variables here...
};

type ImportMeta = {

  /** Contains application environment data. */
  readonly env: ImportMetaEnv;
};
