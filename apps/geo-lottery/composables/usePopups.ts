
export interface PopupBase {
  type: string,
  backModal?: any
  parentBackModal?: any
}

//My interface
export interface PopupTypeInsufficientFunds extends PopupBase {
  type: 'insufficient-funds',
}
export interface PopupTypeYouWin extends PopupBase {
  type: 'popup-type-you-win',
}
export interface PopupTypePurchaseTickets extends PopupBase {
  type: 'popup-type-purchase-tickets',
}
export interface PopupTypeOneTimeEntry extends PopupBase {
  type: 'popup-type-one-time-entry',
}
export interface PopupTypeOneTimeEntrySuccess extends PopupBase {
  type: 'popup-type-one-time-entry-success',
  entries: number
}
export interface PopupTypeSubscribe extends PopupBase {
  type: 'popup-type-subscribe',
}
export interface PopupTypeSubscribeSuccess extends PopupBase {
  type: 'popup-type-subscribe-success',
  entries: number
}
export interface PopupTypeSwap extends PopupBase {
  type: 'popup-type-swap',
}
export interface PopupTypeSwapSuccess extends PopupBase {
  type: 'popup-type-swap-success',
  tokenSwapOrder: string,
  value: number
}
export interface PopupTypeManageTickets extends PopupBase {
  type: 'popup-type-manage-tickets',
}


type Popup = PopupTypeInsufficientFunds | PopupTypeYouWin | PopupTypePurchaseTickets | PopupTypeOneTimeEntry | PopupTypeOneTimeEntrySuccess | PopupTypeSubscribe | PopupTypeSubscribeSuccess | PopupTypeSwap
 | PopupTypeManageTickets | PopupTypeSwapSuccess
export const usePopups = () => {
  const popup = useState<Popup | null>('active-popup', () => null)

  const displayPopup = (newPopup: Popup) => {
    popup.value = newPopup
  }

  const closeActivePopup = () => popup.value = null

  return {
    closeActivePopup,
    displayPopup,
    popup
  };
};



