import { IXToken } from "~/../../layers/ix-base/composables/Token/useIXToken";
import { CartItem } from "./useCart";
import { ListingItem } from "./useListing";
import {BiddingItem} from "~/composables/useBidding";

export interface PopupBase {
  type: string
}

export interface PopupOnList extends PopupBase {
  type: 'listing-successful',
  items: ListingItem[]
}

export interface PopupOnBidding extends PopupBase {
  type: 'bidding2-successful',
  items: BiddingItem[]
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
  items: IXToken[]
}

export interface PopupBidItem extends PopupBase {
  type: 'bid-item',
  items: IXToken[]
}

type Popup = PopupOnList | PopupOnBidding | PopupOnBid | PopupTransfer | PopupListItem | PopupBidItem

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



