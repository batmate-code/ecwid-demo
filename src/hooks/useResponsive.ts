import type { BreakpointName } from '@/style/globalTypes';
import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useMemo } from 'react';

export type ResponsiveInfo = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  breakpoint: BreakpointName;
};

const toMaxWidthQuery = (value: string | number) =>
  `(max-width: ${typeof value === 'number' ? `${value}px` : value})`;

/** Reports current responsive flags and the active Mantine breakpoint. */
export const useResponsive = (): ResponsiveInfo => {
  const theme = useMantineTheme();
  const smallerThanSm = useMediaQuery(toMaxWidthQuery(theme.breakpoints.sm));
  const smallerThanMd = useMediaQuery(toMaxWidthQuery(theme.breakpoints.md));
  const smallerThanLg = useMediaQuery(toMaxWidthQuery(theme.breakpoints.lg));
  const smallerThanXl = useMediaQuery(toMaxWidthQuery(theme.breakpoints.xl));

  let breakpoint: BreakpointName = 'xl';
  if (smallerThanSm) breakpoint = 'xs';
  else if (smallerThanMd) breakpoint = 'sm';
  else if (smallerThanLg) breakpoint = 'md';
  else if (smallerThanXl) breakpoint = 'lg';

  return useMemo<ResponsiveInfo>(() => {
    const isMobile = breakpoint === 'xs' || breakpoint === 'sm';
    const isTablet = breakpoint === 'md';
    const isDesktop = breakpoint === 'lg' || breakpoint === 'xl';
    return { isMobile, isTablet, isDesktop, breakpoint };
  }, [breakpoint]);
};
