import { IXToken } from "~/../../layers/ix-base/composables/Token/useIXToken";
import { CartItem } from "./useCart";

export interface PopupBase {
  type: string
}

export interface PopupOnList extends PopupBase {
  type: 'listing-successful',
  items: CartItem[]
}

export interface PopupOnBid extends PopupBase {
  type: 'bidding-successful',
  items: CartItem[]
}

export interface PopupTransfer extends PopupBase {
  type: 'transfer-item',
  item: IXToken
}

export interface PopupListItem extends PopupBase {
  type: 'list-item',
  item: IXToken
}

type Popup = PopupOnList | PopupOnBid | PopupTransfer | PopupListItem

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



