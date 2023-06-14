import { IXToken } from "@ix/base/composables/Token/useIXToken";
import { CartItem } from "./useCart";
import { ListingItem, UnlistingItem } from "./useListing";
import { BiddingItem, UnbidItem } from "~/composables/useBidding";
import { TransferItem, TransferToWalletItem } from "./useTransfer";
import { TransactionItem } from "./useTransactions";
import { OfferItem } from "~/composables/useOffer";

export interface PopupBase {
  type: string
}

export interface PopupOnList extends PopupBase {
  type: 'listing-successful',
  items: ListingItem[]
}

export interface PopupOnBid extends PopupBase {
  type: 'bidding-successful',
  items: TransactionItem[]
}

export interface PopupTransfer extends PopupBase {
  type: 'transfer-item',
  items: IXToken[]
}

export interface PopupTransferSuccess extends PopupBase {
  type: 'transfer-item-successful',
  items: TransferToWalletItem
}

export interface PopupListItem extends PopupBase {
  type: 'list-item',
  items: IXToken[]
}

export interface PopupUnlistItem extends PopupBase {
  type: 'unlist-item',
  items: UnlistingItem[]
}

export interface PopupUnlistItemSuccess extends PopupBase {
  type: 'unlist-item-success',
  items: UnlistingItem[]
}

export interface PopupBidItem extends PopupBase {
  type: 'bid-item',
  items: IXToken[]
}

export interface PopupUnbidItem extends PopupBase {
  type: 'unbid-item',
  items: UnbidItem[]
}

export interface PopupUnbidSuccess extends PopupBase {
  type: 'unbid-success',
  items: UnbidItem[]
}

export interface PopupBuyItemSuccess extends PopupBase {
  type: 'buy-items-success',
  items: TransactionItem[]
}

export interface PopupAcceptItem extends PopupBase {
  type: 'accept-item',
  item: IXToken
}

export interface PopupAcceptItemsSuccess extends PopupBase {
  type: 'accept-items-success',
  item: TransactionItem
}

export interface PopupInsufficientFunds extends PopupBase {
  type: 'insufficient-funds',
}

type Popup = PopupOnList | PopupOnBid | PopupTransfer | PopupListItem | PopupUnlistItem | PopupBidItem | PopupUnbidItem | PopupTransferSuccess | PopupBuyItemSuccess | PopupAcceptItem | PopupAcceptItemsSuccess | PopupInsufficientFunds | PopupUnlistItemSuccess | PopupUnbidSuccess

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



