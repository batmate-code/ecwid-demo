import { Theme } from '@/components/ThemeToggle';
import { useMantineColorScheme } from '@mantine/core';
/**
 * Hook that returns an opposite Mantine color token to keep contrast when switching themes.
 * (Some Mantine components mis-handle default colors on theme switch, so we force a safe contrast.)
 */
const useGetOppositeColor = () => {
  const { colorScheme } = useMantineColorScheme();
  const textColor = colorScheme === Theme.Dark ? 'gray' : 'dark';
  const buttonVariant = colorScheme === Theme.Dark ? 'default' : 'dark';

  return { textColor, buttonVariant };
};

export default useGetOppositeColor;
