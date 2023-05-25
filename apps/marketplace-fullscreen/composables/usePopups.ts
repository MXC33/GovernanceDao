

export type Popups = 'copy-link' | 'add-to-cart' | 'remove-from-cart' | 'add-favorite' | 'remove-favorite' | 'transfer' | 'purchase-confirmed' | 'insufficient-funds' | 'transaction-error' | 'success'

export const usePopups = () => {
  const popupNotification = useState<Popups | null>('active-popup', () => null)
  const popupModal = useState<boolean | null>('transfer-popup', () => null)


  const setPopupTimeout = () => {
    setTimeout(() => {
      popupNotification.value = null
    }, 50000);
  };

  return {
    popupNotification,
    popupModal,
    setPopupTimeout,
  };
};



