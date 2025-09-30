import '@testing-library/jest-dom/vitest';
import '@/i18n/i18n';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => cleanup());

if (typeof window.matchMedia !== 'function') {
  window.matchMedia = (query: string) => {
    const mql: MediaQueryList = {
      media: query,
      matches: false,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => true,
    };
    return mql;
  };
}

if (!('ResizeObserver' in window)) {
  // @ts-expect-error jsdom env
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (!window.scrollTo) {
  window.scrollTo = () => {};
}

if (!('IntersectionObserver' in window)) {
  // @ts-expect-error jsdom env
  window.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
    root = null;
    rootMargin = '';
    thresholds = [];
  };
}
