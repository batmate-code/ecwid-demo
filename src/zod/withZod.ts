import { z } from 'zod';
import { zodGuardConfig } from './config';

type WithZodOptions = {
  enabled?: boolean;
  label?: string;
  mode?: 'throw' | 'warn' | 'silent';
};

export const withZod = async <TData>(
  promiseFactory: () => Promise<{ data: unknown }>,
  schema: z.ZodType<TData>,
  opts: WithZodOptions = {},
): Promise<TData> => {
  const enabled = opts.enabled ?? zodGuardConfig.enabled;
  const mode = opts.mode ?? zodGuardConfig.mode;
  const label = opts.label ?? 'response';

  const { data } = await promiseFactory();

  if (!enabled) return data as TData;

  const result = schema.safeParse(data);

  if (result.success) {
    return result.data;
  }

  const header = `[${zodGuardConfig.appLabel}] withZod: invalid ${label}`;
  const issues = result.error.issues.map((i) => `• ${i.path.join('.')} — ${i.message}`).join('\n');

  if (mode === 'throw') {
    throw new Error(`${header}\n${issues}`);
  } else if (mode === 'warn') {
    // eslint-disable-next-line no-console
    console.warn(`${header}\n${issues}`, { data });
  }
  return data as TData;
};
