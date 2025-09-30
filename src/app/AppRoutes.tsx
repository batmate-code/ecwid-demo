import { Routes, Route } from 'react-router-dom';
import RootLayout from '@/common/Layout/RootLayout';
import ProductsCatalog from '@/pages/ProductsCatalog';
import { lazy, Suspense } from 'react';
import FullPageLoader from '@/common/FullPageLoader';

const ProductPage = lazy(() => import('@/pages/ProductPage'));
const CartPage = lazy(() => import('@/pages/CartPage'));

export function AppRoutes() {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="cart" element={<CartPage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route index element={<ProductsCatalog />} />
          <Route path=":categoryPath/*" element={<ProductsCatalog />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
