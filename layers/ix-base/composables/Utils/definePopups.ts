
export const definePopups = <T>() => {
  const popup = useState<T | null>('active-popup', () => null)

  const displayPopup = (newPopup: T) => {
    popup.value = newPopup
  }

  const closeActivePopup = () => popup.value = null

  return {
    closeActivePopup,
    displayPopup,
    popup
  };
};
