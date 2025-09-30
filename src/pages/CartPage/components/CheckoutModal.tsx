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
  Text,
  Divider,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import type { CartItem } from '@/store/slices/cart';
import { useTranslation } from 'react-i18next';
import { useNotify } from '@/hooks/useNotify';
import { useResponsive } from '@/hooks/useResponsive';

type CheckoutModalProps = {
  opened: boolean;
  onClose: () => void;
  cartProducts: CartItem[];
  onBackToShop: () => void;
};

const CheckoutModal: FC<CheckoutModalProps> = ({ opened, onClose, cartProducts, onBackToShop }) => {
  const [currentState, setCurrentState] = useState(0);
  const [fakeLoading, setFakeLoading] = useState(false);
  const { t } = useTranslation('cart');
  const notify = useNotify();
  const { isMobile } = useResponsive();

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

  const handleSubmit = form.onSubmit(() => {
    setFakeLoading(true);
    setTimeout(() => {
      setFakeLoading(false);
      setCurrentState(1);
      notify.success(t('notifyOrderPlaced'));
    }, 3000);
  });

  const onCloseModified = () => {
    if (currentState === 1) {
      onClose();
      onBackToShop();
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
        active={currentState + 1}
        onStepClick={setCurrentState}
        allowNextStepsSelect={false}
        size="sm"
        mb="md"
        contentPadding={'xs'}
        orientation={isMobile ? 'vertical' : 'horizontal'}
      >
        <Stepper.Step label={<Text>{t('checkoutStepDetailsTitle')}</Text>} />
        <Stepper.Step label={<Text>{t('checkoutStepSuccessTitle')}</Text>} />
      </Stepper>

      {currentState === 0 && (
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

      {currentState === 1 && (
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
