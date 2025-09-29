interface ImportMetaEnv {
  readonly VITE_ECWID_STORE_ID: string;
  readonly VITE_ECWID_PUBLIC_TOKEN: string;
  readonly VITE_ZOD_GUARD_ENABLED: boolean;
  readonly VITE_ZOD_GUARD_MODE: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
