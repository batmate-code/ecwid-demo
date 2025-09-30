import { z } from 'zod';
import { withZod } from '@/zod/withZod';

const okSchema = z.object({ a: z.number() });
const badData = { a: 'test' };

const factoryAsync = (data: unknown) => async () => ({ data });

const warnSpy = vi.spyOn(console, 'warn');
afterEach(() => warnSpy.mockClear());

describe('withZod', () => {
  it('returns parsed data when valid (enabled)', async () => {
    const result = await withZod(() => Promise.resolve({ data: { a: 1 } }), okSchema, {
      enabled: true,
      mode: 'throw',
      label: 'test',
    });
    expect(result).toEqual({ a: 1 });
  });

  it('mode=throw: throws on invalid', async () => {
    await expect(
      withZod(factoryAsync(badData), okSchema, { enabled: true, mode: 'throw', label: 'Test' }),
    ).rejects.toThrow(/invalid Test/i);
  });

  it('mode=warn: does not throw, logs, returns raw data', async () => {
    const result = await withZod(factoryAsync(badData), okSchema, {
      enabled: true,
      mode: 'warn',
      label: 'Test',
    });
    expect(warnSpy).toHaveBeenCalled();
    expect(result).toEqual(badData);
  });

  it('mode=silent: returns raw without logging', async () => {
    const result = await withZod(factoryAsync(badData), okSchema, {
      enabled: true,
      mode: 'silent',
    });
    expect(warnSpy).not.toHaveBeenCalled();
    expect(result).toEqual(badData);
  });

  it('enabled=false: skips validation entirely', async () => {
    const result = await withZod(factoryAsync(badData), okSchema, {
      enabled: false,
      mode: 'throw',
    });
    expect(result).toEqual(badData);
    expect(warnSpy).not.toHaveBeenCalled();
  });
});
