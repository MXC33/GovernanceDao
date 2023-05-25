

export type Popups = 'copy-link' | 'add-to-cart' | 'add-favorite' | 'remove-favorite' | 'transfer'

export const usePopups = () => {
  const popupNotification = useState<Popups | null>('active-popup', () => null)
  const popupModal = useState<boolean | null>('transfer-popup', () => null)


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



