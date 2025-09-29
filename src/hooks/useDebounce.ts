import { useEffect, useState } from 'react';

/** Delays propagating `value` changes until there has been no update for delayMs.*/
export const useDebounce = <T>(value: T, delayMs = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);

  return debouncedValue;
};
