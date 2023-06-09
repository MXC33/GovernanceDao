import { IXToken } from "@ix/base/composables/Token/useIXToken"
import { AdjustableNumber } from "~/../../layers/ix-base/composables/Utils/useAdjustableNumber";
import { differenceInDays } from "date-fns";

export interface TransactionItem {
  type?: 'list' | 'bid' | 'accept'
  token: IXToken,
  shares: AdjustableNumber,
  durationInDays?: number,
  ixtPrice?: number
}

export const useTransactions = () => {
  const { t } = useI18n()

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

  const getTotalIXTPrice = (items: TransactionItem[]) =>
    items.reduce((prev, item) =>
      prev + (Number(item.token.sale_price) * item.shares.value)
      , 0)

  const itemsInvalid = (items: TransactionItem[]) =>
    items.some((item) => !item.ixtPrice || !item.shares.value)

  const priceRenderString = (price: number | undefined) =>
    String(price ? roundToDecimals(price, 6) : '--')

  return {
    priceRenderString,
    itemsInvalid,
    getTotalIXTPrice,
    formattedDays,
    durationInDaysFromTimestamp
  }
}
