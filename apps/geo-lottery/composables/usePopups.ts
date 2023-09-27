
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
  nft_link: string,
  lottery_id: number,
  prize: number
}

export interface PopupTypeYouClaimed extends PopupBase {
  type: 'popup-type-you-claimed',
  token_id: number,
  lottery_id: number,
}

export interface PopupTypeYouClaimedWithoutNFT extends PopupBase {
  type: 'popup-type-you-claimed-without-nft',
  prize: number
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
export interface PopupTypeUnsubscribeSuccess extends PopupBase {
  type: 'popup-type-unsubscribe-success'
}

type Popup = PopupTypeInsufficientFunds | PopupTypeYouWin | PopupTypeYouClaimed | PopupTypeYouClaimedWithoutNFT | PopupTypePurchaseTickets | PopupTypeOneTimeEntry | PopupTypeOneTimeEntrySuccess | PopupTypeSubscribe | PopupTypeSubscribeSuccess | PopupTypeSwap
  | PopupTypeManageTickets | PopupTypeSwapSuccess | PopupTypeUnsubscribeSuccess
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



