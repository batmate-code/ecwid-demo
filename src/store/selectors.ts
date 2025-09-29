import type { StoreState } from './index';

export const selectCartProducts = (s: StoreState) => s.cart.products;

export const selectAddProduct = (s: StoreState) => s.cart.addProduct;

export const selectRemoveProduct = (s: StoreState) => s.cart.removeProduct;

export const selectClearCart = (s: StoreState) => s.cart.clearCart;

export const selectCartCount = (s: StoreState) =>
  s.cart.products.reduce((acc, product) => acc + product.amount, 0);

export const selectCartTotal = (s: StoreState) =>
  s.cart.products.reduce((acc, product) => acc + product.price * product.amount, 0);
