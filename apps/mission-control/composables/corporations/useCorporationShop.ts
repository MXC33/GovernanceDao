import { Corporation, CorporationAdjustableToken } from './useCorporations'
import { TokenWithInfoBlocks } from '../useInfoBlocks'
import { NftFragment, GenericStoreSaleInfoFragment } from '#gql'
import { AdjustableToken } from '@ix/base/composables/Utils/useAdjustableNumber'

export type Currency = 'ixt' | 'usdt' | 'usdc' | 'matic' | 'weth' | 'usd' | 'visa' | 'astro-credit' | 'waste' | 'energy'

export interface CorporationShopItem extends GenericStoreSaleInfoFragment, TokenWithInfoBlocks {
  payment: AdjustableToken,
  subTitle?: string
}


export interface OrderClaim {
  nft: NftFragment,
  corporation: Corporation
}

export interface SwapHistoryItem {
  from: NftFragment,
  to: NftFragment,
  amount: number,
  date: number
}

export const useCorporationShop = () => {
  const activeShopItem = useState<CorporationShopItem | null>('corporation-selected-shop', () => null)
  const chosenCurrency = useState<Currency>('chosen-currency', () => 'energy')
  const availableItems = useState<CorporationShopItem[]>('corporation-available-shop-items', () => null)

  const currenciesWithoutCap: Currency[] = ['usd', 'usdc', 'usdt', 'visa', 'ixt']
  const { getCurrencyToken } = useCurrencyData()
  const completion = useCorporationCompletion()

  const initializeShop = (items: CorporationShopItem[]) => {
    availableItems.value = items
    completion.resetComplete()
  }

  const resetShopItem = () => {
    activeShopItem.value = null
  }

  const activePaymentItems = computed(() =>
    (activeShopItem.value?.paymentMethod ?? []) as Currency[]
  )

  const setChosenCurrencyToDefault = () => {
    if (!activePaymentItems.value?.includes(chosenCurrency.value))
      chosenCurrency.value = activePaymentItems.value[0] as Currency
  }

  const setupPaymentForItem = (item: GenericStoreSaleInfoFragment) => {
    const preferredPayment = item.paymentMethod[0] as Currency

    if (!preferredPayment)
      return

    if (preferredPayment != chosenCurrency.value)
      chosenCurrency.value = preferredPayment

    const token = getCurrencyToken(chosenCurrency.value)
    const fromUser = !currenciesWithoutCap.includes(preferredPayment)
    const paymentMethod = item.paymentMethod[0] as Currency

    return addAdjustableToToken(token, {
      min: 1,
      payment: {
        price: item.price,
        paymentMethod
      },
      multiplier: 1,
      max: item.userCap,
      fromUser
    })
  }

  return {
    ...completion,
    initializeShop,
    resetShopItem,
    setupPaymentForItem,
    setChosenCurrencyToDefault,
    activePaymentItems,
    currenciesWithoutCap,
    availableItems,
    activeShopItem,
    chosenCurrency,
  }
}

