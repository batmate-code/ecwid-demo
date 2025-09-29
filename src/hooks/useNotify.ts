import { notifications } from '@mantine/notifications';

export const useNotify = () => {
  return {
    success: (message: string, title = 'Success') =>
      notifications.show({ title, message, color: 'teal', autoClose: 2500 }),
    error: (message: string, title = 'Error') =>
      notifications.show({ title, message, color: 'red' }),
    info: (message: string, title?: string) =>
      notifications.show({ title, message, color: 'blue' }),
    loading: (message: string) => notifications.show({ message, loading: true, autoClose: false }),
    update: notifications.update,
    hide: notifications.hide,
  };
};
