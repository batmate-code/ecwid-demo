vi.mock('@mantine/notifications', () => ({
  notifications: {
    show: vi.fn(),
    update: vi.fn(),
    hide: vi.fn(),
  },
}));

import { useNotify } from '@/hooks/useNotify';
import { notifications } from '@mantine/notifications';
import { Mock } from 'vitest';

describe('useNotify', () => {
  beforeEach(() => {
    (notifications.show as Mock).mockClear();
    (notifications.update as Mock).mockClear();
    (notifications.hide as Mock).mockClear();
  });

  it('success shows teal notification with default title', () => {
    const notify = useNotify();
    notify.success('Saved');
    expect(notifications.show).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Success',
        message: 'Saved',
        color: 'teal',
        autoClose: 2500,
      }),
    );
  });

  it('error shows red notification', () => {
    const notify = useNotify();
    notify.error('Oops', 'Failure');
    expect(notifications.show).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Failure', message: 'Oops', color: 'red' }),
    );
  });

  it('info shows blue notification (optional title)', () => {
    const notify = useNotify();
    notify.info('Heads up');
    expect(notifications.show).toHaveBeenCalledWith(
      expect.objectContaining({ title: undefined, message: 'Heads up', color: 'blue' }),
    );
  });

  it('loading shows persistent loader', () => {
    const notify = useNotify();
    notify.loading('Loading...');
    expect(notifications.show).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Loading...', loading: true, autoClose: false }),
    );
  });
});
