import { useEffect } from 'react';
import { useStore } from '@/store';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { selectConsumeSilenceOnce } from '@/store/selectors';

export const CartNotificationsBridge = () => {
  const { t } = useTranslation('cart');
  const consumeSilenceOnce = useStore(selectConsumeSilenceOnce);

  useEffect(() => {
    const unsubscribe = useStore.subscribe((state, prev) => {
      if (consumeSilenceOnce()) return;

      const products = state.cart.products;
      const prevProducts = prev.cart.products;

      const added = products.filter(
        (product) => !prevProducts.some((prevProduct) => prevProduct.id === product.id),
      );
      const removed = prevProducts.filter(
        (prevProduct) => !products.some((product) => product.id === prevProduct.id),
      );

      added.forEach((p) =>
        notifications.show({
          color: 'teal',
          message: t('notifyProductAdded', {
            name: p.name,
          }),
        }),
      );

      removed.forEach((p) =>
        notifications.show({
          color: 'red',
          message: t('notifyProductRemoved', {
            name: p.name,
          }),
        }),
      );
    });

    return unsubscribe;
  }, [consumeSilenceOnce, t]);

  return null;
};

export default CartNotificationsBridge;
