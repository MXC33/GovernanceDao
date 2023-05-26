

export type Popups = 'copy-link' | 'add-to-cart' | 'remove-from-cart' | 'add-favorite' | 'remove-favorite' | 'transfer' | 'purchase-confirmed' | 'insufficient-funds' | 'transaction-error' | 'success'

export const usePopups = () => {
  const popupNotification = useState<Popups | null>('popup-notification', () => null)
  const popupModal = useState<boolean | null>('popup-modal', () => null)


  const setPopupTimeout = () => {
    setTimeout(() => {
      popupNotification.value = null
    }, 5000);
  };

  return {
    popupNotification,
    popupModal,
    setPopupTimeout,
  };
};



