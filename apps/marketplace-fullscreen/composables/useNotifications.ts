

export type NotificationType = 'copy-link' | 'add-to-cart' | 'remove-from-cart' | 'add-favorite' | 'remove-favorite' | 'transfer' | 'purchase-confirmed' | 'insufficient-funds' | 'transaction-error' | 'success'

export const useNotifications = () => {
  const activeNotification = useState<NotificationType | null>('active-notification', () => null)

  const displayNotification = (type: NotificationType) => {
    activeNotification.value = type
    resetNotificationTimeout()
  }

  const resetNotificationTimeout = (timeout: number = 5000) => {
    setTimeout(() => {
      activeNotification.value = null
    }, 5000);
  };

  return {
    activeNotification,
    displayNotification,
    resetNotificationTimeout,
  };
};



