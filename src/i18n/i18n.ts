import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en_common from './locales/en/common.json';
import en_layout from './locales/en/layout.json';
import en_catalog from './locales/en/catalog.json';
import en_cart from './locales/en/cart.json';
import en_product from './locales/en/product.json';

import ru_common from './locales/ru/common.json';
import ru_layout from './locales/ru/layout.json';
import ru_catalog from './locales/ru/catalog.json';
import ru_cart from './locales/ru/cart.json';
import ru_product from './locales/ru/product.json';

const STORAGE_KEY = 'ecwid-lang';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',

    ns: ['common', 'layout', 'catalog', 'cart', 'product'],
    defaultNS: 'common',

    resources: {
      en: {
        common: en_common,
        layout: en_layout,
        catalog: en_catalog,
        cart: en_cart,
        product: en_product,
      },
      ru: {
        common: ru_common,
        layout: ru_layout,
        catalog: ru_catalog,
        cart: ru_cart,
        product: ru_product,
      },
    },

    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: STORAGE_KEY,
      caches: ['localStorage'], // автоматически кэшировать найденный язык
    },

    interpolation: { escapeValue: false },

    react: { useSuspense: true },
  });

i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {}
});

export default i18n;
