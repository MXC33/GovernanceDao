import { IXToken } from "@ix/base/composables/Token/useIXToken"
import { TransactionItem } from "./useTransactions";

export interface BiddingItem extends TransactionItem {
  type: 'bid'
}

export const useBiddingItems = () => {
  const bidItems = useState<BiddingItem[]>('bidding-items', () => [])

  const createBidItems = (items: IXToken[]) => {
    bidItems.value = items.map((token) => ({
      type: 'bid',
      token,
      shares: {
        min: 1,
        value: 1,
        max: token.my_shares
      },
      durationInDays: 1,
      ixtPrice: 0
    }))
  }

  return {
    createBidItems,
    bidItems
  }
}
