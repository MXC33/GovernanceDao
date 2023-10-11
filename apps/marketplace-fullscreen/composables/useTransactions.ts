import { IXToken } from "@ix/base/composables/Token/useIXToken"
import { AdjustableNumber } from "@ix/base/composables/Utils/useAdjustableNumber";
import { differenceInDays, add } from "date-fns";

export interface TransactionItem {
  type?: 'list' | 'bid' | 'accept' | 'transfer' | 'reject'
  token: IXToken,
  shares: AdjustableNumber,
  durationInDays?: number,
  ixtPrice?: number
}

export const TransactionDays = [1, 3, 7, 30, 91, 183]


export const useTransactionContract = () => {
  const getEndTime = (durationInDays?: number) =>
    Math.floor(add(new Date(), { days: durationInDays ?? 0 }).getTime() / 1000)

  const baseConsideration = {
    itemType: ItemType.ERC20,
    token: IXTAddress.polygon,
    identifierOrCriteria: 0,
  }

  const getItemType = (token: IXToken) => {
    return token.nft_type === NFTType.ERC1155 ?
      ItemType.ERC1155 : ItemType.ERC721
  }

  return {
    baseConsideration,
    getItemType,
    getEndTime
  }
}


export const useTransactions = () => {
  const { t } = useI18n()

  const MP_FEE = 0.05

  const formattedDays = (days: number) => {
    const daysAsMonths = Math.floor(days / 30)
    const daysAsWeek = Math.floor(days / 7)

    if (days >= 30)
      return `${daysAsMonths} ${t('general.month', daysAsMonths)}`

    if (days >= 7)
      return `${daysAsWeek} ${t('general.week', daysAsWeek)}`

    return `${days} ${t('general.day', days)}`
  }

  const durationInDaysFromTimestamp = (timestamp: number) => {
    const difference = differenceInDays(new Date(timestamp * 1000), new Date());
    if (difference <= 1) return 1
    else if (difference <= 3) return 3
    else if (difference <= 7) return 7
    else if (difference <= 30) return 30
    else if (difference <= 91) return 91
    else return 183
  }

  const getTotalIXTPrice = (items: TransactionItem[], userPrice?: boolean) => {
    const getPrice = (item: TransactionItem) =>
      getItemPrice(item, userPrice) * item.shares.value

    return items.reduce((prev, item) =>
      prev + getPrice(item)
      , 0)
  }
  const getItemPrice = (item: TransactionItem, userPrice?: boolean) => {
    if (userPrice)
      return Number(item.ixtPrice)

    return Number(item.token.sale_price)
  }

  const itemsInvalid = (items: TransactionItem[], userPrice?: boolean) =>
    items.some((item) => itemIsInvalid(item, userPrice))

  const itemIsInvalid = (item: TransactionItem, userPrice?: boolean) => {
    const price = getItemPrice(item, userPrice)
    return !price || price == 0 || !item.shares.value
  }

  const priceRenderString = (price: number | undefined) =>
    String(price ? roundToDecimals(price, 6) : '--')

  const isItemInvalid = (items: TransactionItem[], userPrice?: boolean) => {
    const invalid = !itemsInvalid(items, userPrice)
    const price = getTotalIXTPrice(items, userPrice);

    if (invalid && price > 0) {
      return false;
    }
    return true;
  }

  return {
    MP_FEE,
    priceRenderString,
    itemsInvalid,
    itemIsInvalid,
    getTotalIXTPrice,
    formattedDays,
    durationInDaysFromTimestamp,
    isItemInvalid
  }
}
