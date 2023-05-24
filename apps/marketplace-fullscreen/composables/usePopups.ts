export const useTransferVisible = () => useState<boolean | null>('transfer-popup', () => false)


export type Popups = 'copy-link' | 'add-to-cart' | 'add-favorite' | 'remove-favorite' | 'transfer'

export const usePopups = () => {
  const activePopup = useState<Popups | null>('active-popup', () => null)

  const setPopupTimeout = () => {
    setTimeout(() => {
      activePopup.value = null
    }, 5000);
  };

  return {
    activePopup,
    setPopupTimeout,
  };
};



