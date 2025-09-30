import { useStore } from '@/store';
import { CartItem } from '@/store/slices/cart';

const sample = (over: Partial<CartItem> = {}) => ({
  id: 1,
  name: 'Test',
  price: 19.95,
  amount: 1,
  imageUrl: 'https://cdn/x.png',
  ...over,
});

const makeSampleItem = () => {
  return sample({});
};

const resetCart = () => {
  localStorage.clear();
  const { clearCart, consumeSilenceOnce } = useStore.getState().cart;
  clearCart();
  consumeSilenceOnce();
};

describe('cart slice', () => {
  beforeEach(() => {
    resetCart();
  });

  afterEach(() => {
    resetCart();
  });

  it('initially is empty', () => {
    const { products } = useStore.getState().cart;
    expect(products).toEqual([]);
  });

  it('addProduct pushes a new item when not exists and amount > 0', () => {
    const { addProduct } = useStore.getState().cart;

    addProduct(makeSampleItem());
    const { products } = useStore.getState().cart;

    expect(products).toHaveLength(1);
    expect(products[0]).toMatchObject({ id: 1, amount: 1, name: 'Test', price: 19.95 });
  });

  it('addProduct with amount <= 0 does nothing if item does not exist', () => {
    const { addProduct } = useStore.getState().cart;

    addProduct(sample({ amount: 0 }));
    expect(useStore.getState().cart.products).toHaveLength(0);

    addProduct(sample({ amount: -3 }));
    expect(useStore.getState().cart.products).toHaveLength(0);
  });

  it('addProduct merges by id: increments amount for existing item', () => {
    const { addProduct } = useStore.getState().cart;

    addProduct(sample({ amount: 2 }));
    addProduct(sample({ amount: 3 }));
    const { products } = useStore.getState().cart;

    expect(products).toHaveLength(1);
    expect(products[0].amount).toBe(5);
  });

  it('addProduct can reduce amount; removes item if amount becomes <= 0', () => {
    const { addProduct } = useStore.getState().cart;

    addProduct(sample({ amount: 2 }));
    expect(useStore.getState().cart.products[0].amount).toBe(2);

    addProduct(sample({ amount: -3 }));
    expect(useStore.getState().cart.products).toHaveLength(0);
  });

  it('removeProduct removes item by id', () => {
    const { addProduct, removeProduct } = useStore.getState().cart;

    addProduct(makeSampleItem());
    addProduct(sample({ id: 2, name: 'Text' }));
    expect(useStore.getState().cart.products).toHaveLength(2);

    removeProduct(1);
    const { products } = useStore.getState().cart;
    expect(products).toHaveLength(1);
    expect(products[0].id).toBe(2);
  });

  it('clearCart empties products', () => {
    const { addProduct, clearCart } = useStore.getState().cart;

    addProduct(sample({ id: 1 }));

    expect(useStore.getState().cart.products).toHaveLength(1);

    addProduct(sample({ id: 2 }));

    expect(useStore.getState().cart.products).toHaveLength(2);

    clearCart();
    expect(useStore.getState().cart.products).toHaveLength(0);
  });

  it('clearCart({ silent: true }) sets one-time silence flag', () => {
    const { addProduct, clearCart, consumeSilenceOnce } = useStore.getState().cart;

    addProduct(makeSampleItem());
    clearCart({ silent: true });

    expect(consumeSilenceOnce()).toBe(true);
    expect(consumeSilenceOnce()).toBe(false);
  });
});
