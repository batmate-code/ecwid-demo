import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createCartSlice, type CartSlice } from './slices/cart';

export interface StoreState {
  cart: CartSlice;
}

const persistConfig = {
  name: 'app-store',
  version: 1,
  storage: createJSONStorage(() => localStorage),
  partialize: (state: StoreState) => ({
    cart: { products: state.cart.products },
  }),
  merge: (persisted: any, current: StoreState): StoreState => {
    return {
      ...current,
      cart: {
        ...current.cart,
        ...(persisted?.cart ?? {}),
      },
    };
  },
} as const;

export const useStore = create<StoreState>()(
  devtools(
    persist(
      immer((...args) => ({
        cart: createCartSlice(...args),
      })),
      persistConfig,
    ),
    { name: 'root' },
  ),
);
