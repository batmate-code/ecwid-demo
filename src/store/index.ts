import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { persist, createJSONStorage, type PersistOptions } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createCartSlice, type CartSlice } from './slices/cart';

export interface StoreState {
  cart: CartSlice;
}

type PersistedState = {
  cart: {
    products: StoreState['cart']['products'];
  };
};

const persistConfig: PersistOptions<StoreState, PersistedState> = {
  name: 'app-store',
  version: 1,
  storage: createJSONStorage<PersistedState>(() => localStorage),

  partialize: (state) => ({
    cart: { products: state.cart.products },
  }),

  merge: (persisted: unknown, current): StoreState => {
    const p = (persisted ?? {}) as Partial<PersistedState>;
    return {
      ...current,
      cart: {
        ...current.cart,
        ...(p.cart ?? {}),
      },
    };
  },
};

export const useStore = create<StoreState>()(
  persist(
    devtools(
      immer((...args) => ({
        cart: createCartSlice(...args),
      })),
      { name: 'root' },
    ),
    persistConfig,
  ),
);
