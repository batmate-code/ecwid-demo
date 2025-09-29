import { useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export type NavigationOptions = { resetPage?: boolean; replace?: boolean };
/**
 * Hook to safely build links that preserve current query params.
 */
export const useBuildUrl = () => {
  const location = useLocation();
  const search = useMemo(() => new URLSearchParams(location.search), [location.search]);

  /**
   * Builds a URL from `nextPath` + current query.
   * - normalizes leading slash
   * - strips any query/hash from `nextPath`
   * - optionally forces page=1
   */
  const buildUrl = useCallback(
    (nextPath: string, options?: NavigationOptions) => {
      const searchParams = new URLSearchParams(search);
      if (options?.resetPage) searchParams.set('page', '1');
      const path = nextPath.startsWith('/') ? nextPath : `/${nextPath}`;
      const queryString = searchParams.toString();
      return queryString ? `${path}?${queryString}` : path;
    },
    [search],
  );

  return { buildUrl };
};
