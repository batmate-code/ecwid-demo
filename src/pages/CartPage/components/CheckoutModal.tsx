import { useState, type FC } from 'react';
import {
  Modal,
  Stepper,
  TextInput,
  Button,
  Group,
  Stack,
  Title,
  List,
  Divider,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import type { CartItem } from 'store/slices/cart';
import { selectClearCart } from 'store/selectors';
import { useStore } from 'store';
import { useTranslation } from 'react-i18next';
import { useNotify } from 'hooks/useNotify';

type CheckoutModalProps = {
  opened: boolean;
  onClose: () => void;
  cartProducts: CartItem[];
  onBackToShop: () => void;
};

const CheckoutModal: FC<CheckoutModalProps> = ({ opened, onClose, cartProducts, onBackToShop }) => {
  const [active, setActive] = useState(0);
  const [fakeLoading, setFakeLoading] = useState(false);
  const { t } = useTranslation('cart');
  const notify = useNotify();

  const form = useForm({
    initialValues: { name: '', email: '' },
    validateInputOnBlur: true,
    validate: {
      name: (v) => (v.trim() ? null : t('checkoutNameRequired')),
      email: (v) => {
        const val = v.trim();
        if (!val) return t('checkoutEmailRequired');
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? null : t('checkoutEmailInvalid');
      },
    },
  });

  const clearCart = useStore(selectClearCart);

  const handleSubmit = form.onSubmit(() => {
    setFakeLoading(true);
    setTimeout(() => {
      setFakeLoading(false);
      setActive(1);
      notify.success(t('notifyOrderPlaced'));
    }, 3000);
  });

  const onCloseModified = () => {
    if (active === 1) {
      onClose();
      clearCart();
    } else {
      onClose();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onCloseModified}
      title={t('checkoutModalTitle')}
      closeOnClickOutside={!fakeLoading}
      centered
      closeButtonProps={{ disabled: fakeLoading }}
    >
      <Stepper
        active={active}
        onStepClick={setActive}
        allowNextStepsSelect={false}
        size="sm"
        mb="md"
      >
        <Stepper.Step label={t('checkoutStepDetailsTitle')} />
        <Stepper.Step label={t('checkoutStepSuccessTitle')} />
      </Stepper>

      {active === 0 && (
        <form onSubmit={handleSubmit}>
          <Stack gap="sm">
            <TextInput
              label={t('checkoutNameInputLabel')}
              placeholder={t('checkoutNameInputPlaceholder')}
              {...form.getInputProps('name')}
            />

            <TextInput
              label={t('checkoutEmailInputLabel')}
              placeholder={t('checkoutEmailInputPlaceholder')}
              type="email"
              autoComplete="email"
              {...form.getInputProps('email')}
            />
            <Group justify="flex-end" mt="xs">
              <Button
                type="submit"
                loading={fakeLoading}
                aria-label={t('checkoutPlaceOrderButtonAriaLabel')}
              >
                {t('checkoutPlaceOrderButtonLabelText')}
              </Button>
            </Group>
          </Stack>
        </form>
      )}

      {active === 1 && (
        <Stack gap="sm">
          <Title order={4}>{t('checkoutOrderSuccessText')}</Title>
          <Divider />
          <Title order={6}>{t('checkoutOrderSuccessItemsLabel')}</Title>
          <List spacing="xs">
            {cartProducts.map((product) => (
              <List.Item key={product.id}>
                {product.name} × {product.amount}
              </List.Item>
            ))}
          </List>
          <Group justify="space-between" mt="md">
            <Button onClick={onBackToShop} aria-label={t('checkoutBackToShopButtonAriaLabel')}>
              {t('checkoutBackToShopButtonLabelText')}
            </Button>
          </Group>
        </Stack>
      )}
    </Modal>
  );
};

export default CheckoutModal;
