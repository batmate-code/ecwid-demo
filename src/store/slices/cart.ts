import type { StateCreator } from 'zustand';
import type { StoreState } from '../index';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  amount: number;
  imageUrl: string;
};

export type CartSlice = {
  products: CartItem[];
  __notifySilentOnce: boolean;

  addProduct: (item: CartItem) => void;
  removeProduct: (id: number) => void;
  clearCart: (options?: { silent?: boolean }) => void;
  consumeSilenceOnce: () => boolean;
};

const addProductAction = (state: StoreState, payload: CartItem) => {
  const { id, name, price, amount, imageUrl } = payload;
  const existed = state.cart.products.find((i) => i.id === id);

  if (existed) {
    existed.amount += amount;
    if (existed.amount <= 0) {
      state.cart.products = state.cart.products.filter((i) => i.id !== id);
    }
    return;
  }

  if (amount > 0) {
    state.cart.products.push({ id, name, price, amount, imageUrl });
  }
};

const removeProductAction = (state: StoreState, productId: number) => {
  state.cart.products = state.cart.products.filter((item) => item.id !== productId);
};

const clearCartAction = (state: StoreState) => {
  state.cart.products = [];
};

export const createCartSlice: StateCreator<
  StoreState,
  [['zustand/devtools', never], ['zustand/persist', unknown], ['zustand/immer', never]],
  [],
  CartSlice
> = (set) => {
  const silenceRef = { current: false };

  return {
    products: [],
    __notifySilentOnce: false,

    addProduct: (newProduct) =>
      set((state) => {
        addProductAction(state, newProduct);
      }),

    removeProduct: (productId) =>
      set((state) => {
        removeProductAction(state, productId);
      }),

    clearCart: (opts) =>
      set((state) => {
        const silent = opts?.silent ?? false;
        if (silent) silenceRef.current = true;
        clearCartAction(state);
      }),

    consumeSilenceOnce: () => {
      const prevSilence = silenceRef.current;
      if (prevSilence) silenceRef.current = false;
      return prevSilence;
    },
  };
};
