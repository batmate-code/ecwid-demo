export const MODES = ['throw', 'warn', 'silent'] as const;
export type ZodGuardMode = (typeof MODES)[number];

const rawEnabled = import.meta.env.VITE_ZOD_GUARD_ENABLED as boolean;
const rawMode = import.meta.env.VITE_ZOD_GUARD_MODE as ZodGuardMode;

const guardEnabled = /^true$/i.test(String(rawEnabled));
const guardMode: ZodGuardMode = MODES.includes(rawMode as ZodGuardMode) ? rawMode : 'warn';

export const zodGuardConfig = {
  enabled: guardEnabled,
  mode: guardMode,
  appLabel: 'ecwid-api',
};
