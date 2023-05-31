

export type SnackNotificationType = 'copy-link' | 'add-to-cart' | 'remove-from-cart' | 'add-favorite' | 'remove-favorite' | 'transfer' | 'purchase-confirmed' | 'insufficient-funds' | 'transaction-error' | 'success'

export const useSnackNotifications = () => {
  const activeNotification = useState<SnackNotificationType | null>('active-notification', () => null)

  const displayNotification = (type: SnackNotificationType) => {
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



