import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useResponsive } from '@/hooks/useResponsive';

vi.mock('@mantine/core', async () => {
  const actual = await vi.importActual<typeof import('@mantine/core')>('@mantine/core');
  return {
    ...actual,
    useMantineTheme: () => actual.DEFAULT_THEME,
  };
});

let nextResults: boolean[] = [];
const useMediaQueryMock = vi.fn(() => nextResults.shift() ?? false);

vi.mock('@mantine/hooks', () => ({
  useMediaQuery: () => useMediaQueryMock(),
}));

const setSmallerThan = (sm: boolean, md: boolean, lg: boolean, xl: boolean) => {
  nextResults = [sm, md, lg, xl];
};

describe('useResponsive', () => {
  beforeEach(() => {
    useMediaQueryMock.mockClear();
    nextResults = [];
  });

  it('xs: smaller than sm, breakpoint=xs, only isMobile=true', () => {
    setSmallerThan(true, false, false, false);
    const { result } = renderHook(() => useResponsive());
    expect(result.current).toEqual({
      breakpoint: 'xs',
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });
  });

  it('sm: smaller than md (but not smaller than sm), breakpoint=sm, only isMobile=true', () => {
    setSmallerThan(false, true, false, false);
    const { result } = renderHook(() => useResponsive());
    expect(result.current.breakpoint).toBe('sm');
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(false);
  });

  it('md: smaller than lg (but not smaller than md), breakpoint=md, only isTablet=true', () => {
    setSmallerThan(false, false, true, false);
    const { result } = renderHook(() => useResponsive());
    expect(result.current).toEqual({
      breakpoint: 'md',
      isMobile: false,
      isTablet: true,
      isDesktop: false,
    });
  });

  it('lg: smaller than xl (but not smaller than lg), breakpoint=lg, only isDesktop=true', () => {
    setSmallerThan(false, false, false, true);
    const { result } = renderHook(() => useResponsive());
    expect(result.current.breakpoint).toBe('lg');
    expect(result.current.isDesktop).toBe(true);
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(false);
  });

  it('xl: not smaller than xl, breakpoint=xl, only isDesktop=true', () => {
    setSmallerThan(false, false, false, false);
    const { result } = renderHook(() => useResponsive());
    expect(result.current).toEqual({
      breakpoint: 'xl',
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });
  });
});
