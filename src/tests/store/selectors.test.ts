import { useStore } from '@/store';
import {
  selectCartProducts,
  selectCartCount,
  selectCartTotal,
  selectConsumeSilenceOnce,
} from '@/store/selectors';

const resetCart = () => {
  localStorage.clear();
  const { clearCart, consumeSilenceOnce } = useStore.getState().cart;
  clearCart();
  consumeSilenceOnce();
};

describe('store selectors', () => {
  beforeEach(() => {
    resetCart();
  });

  it('selectCartProducts returns products array', () => {
    const { addProduct } = useStore.getState().cart;
    addProduct({ id: 1, name: 'A', price: 10, amount: 2, imageUrl: 'url' });
    expect(selectCartProducts(useStore.getState())).toHaveLength(1);
  });

  it('selectCartCount sums amounts', () => {
    const { addProduct } = useStore.getState().cart;
    addProduct({ id: 1, name: 'A', price: 10, amount: 2, imageUrl: 'url' });
    addProduct({ id: 2, name: 'B', price: 5, amount: 3, imageUrl: 'url' });
    expect(selectCartCount(useStore.getState())).toBe(5);
  });

  it('selectCartTotal multiplies price*amount and sums', () => {
    const { addProduct } = useStore.getState().cart;
    addProduct({ id: 1, name: 'A', price: 10, amount: 2, imageUrl: 'url' });
    addProduct({ id: 2, name: 'B', price: 5.5, amount: 3, imageUrl: 'url' });
    expect(selectCartTotal(useStore.getState())).toBeCloseTo(36.5);
  });

  it('selectConsumeSilenceOnce returns true once after silent clear', () => {
    const { addProduct, clearCart } = useStore.getState().cart;
    addProduct({ id: 1, name: 'A', price: 10, amount: 1, imageUrl: 'url' });
    clearCart({ silent: true });

    const once = selectConsumeSilenceOnce(useStore.getState());
    expect(once()).toBe(true);
    expect(once()).toBe(false);
  });
});
