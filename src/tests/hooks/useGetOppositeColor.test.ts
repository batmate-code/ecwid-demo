import { renderHook } from '@testing-library/react';

vi.mock('@/style/globalTypes', () => ({
  Theme: { Dark: 'dark', Light: 'light' },
}));

let colorSchemeMock: 'dark' | 'light' = 'light';
vi.mock('@mantine/core', () => ({
  useMantineColorScheme: () => ({ colorScheme: colorSchemeMock }),
}));

import useGetOppositeColor from '@/hooks/useGetOppositeColor';

describe('useGetOppositeColor', () => {
  it('returns gray/default for dark scheme', () => {
    colorSchemeMock = 'dark';
    const { result } = renderHook(() => useGetOppositeColor());
    expect(result.current).toEqual({ textColor: 'gray', buttonVariant: 'default' });
  });

  it('returns dark/dark for light scheme', () => {
    colorSchemeMock = 'light';
    const { result } = renderHook(() => useGetOppositeColor());
    expect(result.current).toEqual({ textColor: 'dark', buttonVariant: 'dark' });
  });
});
