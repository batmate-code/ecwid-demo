import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@fontsource-variable/inter/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { localStorageColorSchemeManager, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import RootLayout from './common/Layout/RootLayout';
import ProductsCatalog from '@/pages/ProductsCatalog';
import { GlobalStyles } from './style/globalStyle';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import { Suspense } from 'react';

const queryClient = new QueryClient();
const colorSchemeManager = localStorageColorSchemeManager({ key: 'ecwid-color-scheme' });

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <MantineProvider
        withCssVariables
        defaultColorScheme="auto"
        colorSchemeManager={colorSchemeManager}
        theme={{
          fontFamily: 'Inter, sans-serif',
          defaultRadius: 'md',
          primaryColor: 'dark',
        }}
      >
        <Notifications />
        <Suspense fallback={null}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RootLayout />}>
                <Route path="cart" element={<CartPage />} />
                <Route path="product/:id" element={<ProductPage />} />
                <Route index element={<ProductsCatalog />} />
                <Route path=":categoryPath/*" element={<ProductsCatalog />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Suspense>
      </MantineProvider>
    </QueryClientProvider>
  );
}
