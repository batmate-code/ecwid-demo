import { describe, it, expect, beforeEach, vi } from 'vitest';
import en_common from '../locales/en/common.json';
import ru_common from '../locales/ru/common.json';

const STORAGE_KEY = 'ecwid-lang';

const freshI18nImport = async () => {
  vi.resetModules();
  const mod = await import('../i18n');
  return mod.default;
};

beforeEach(() => {
  localStorage.clear();
  Object.defineProperty(window.navigator, 'language', { value: 'en-US', configurable: true });
});

describe('i18n', () => {
  it('loads common resource bundles for en and ru', async () => {
    const i18n = await freshI18nImport();
    expect(i18n.getResourceBundle('en', 'common')).toMatchObject(en_common);
    expect(i18n.getResourceBundle('ru', 'common')).toMatchObject(ru_common);
  });

  it('falls back to "en" when no stored language', async () => {
    const i18n = await freshI18nImport();
    expect(i18n.language).toMatch(/^en/i);
  });

  it('reads language from localStorage key "ecwid-lang" on launch', async () => {
    localStorage.setItem(STORAGE_KEY, 'ru');

    const i18n = await freshI18nImport();
    expect(i18n.language).toMatch(/^ru/i);
  });

  it('writes selected language to localStorage on changeLanguage', async () => {
    const i18n = await freshI18nImport();

    await i18n.changeLanguage('ru');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('ru');

    await i18n.changeLanguage('en');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('en');
  });
});
