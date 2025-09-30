import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@fontsource-variable/inter/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider, localStorageColorSchemeManager } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { GlobalStyles } from '@/style/globalStyle';
import CartNotificationsBridge from '@/common/CartNotificationBridge';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient();
const colorSchemeManager = localStorageColorSchemeManager({ key: 'ecwid-color-scheme' });

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <MantineProvider
        withCssVariables
        defaultColorScheme="auto"
        colorSchemeManager={colorSchemeManager}
        theme={{
          fontFamily:
            'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", Ubuntu, Cantarell, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
          primaryColor: 'dark',
        }}
      >
        <Notifications position="bottom-center" limit={3} />
        <CartNotificationsBridge />
        {children}
      </MantineProvider>
    </QueryClientProvider>
  );
}
