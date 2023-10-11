interface PriceResponse {
  ETH: number
  IXT: number
  MATIC: number
}

export const useCurrencyConversion = () => {
  const config = useRuntimeConfig().public

  const { data: currencies, refresh: refreshCurrencies, execute: fetchPrice } = useAsyncDataState('currency-price', () => {
    return $fetch(config.MC_API + '/currency-price', { mode: 'cors' }) as Promise<PriceResponse>
  })

  const setupCurrencyPrice = () => {
    useIntervalFn(() => {
      refreshCurrencies()
    }, 1000 * 60)

    return fetchPrice()
  }

  const ixtToUSD = (value: number) =>
    roundToDecimals(Number(value) * (currencies?.value?.IXT ?? 0), 5)
  const usdToIXT = (value: number) =>
    roundToDecimals(Number(value) / (currencies?.value?.IXT ?? 0), 5)

  const maticToUSD = (value: number) =>
    roundToDecimals(Number(value) * (currencies?.value?.MATIC ?? 0), 5)
  const usdToMatic = (value: number) =>
    roundToDecimals(Number(value) / (currencies?.value?.MATIC ?? 0), 5)

  const ethToUSD = (value: number) =>
    roundToDecimals(Number(value) * (currencies?.value?.ETH ?? 0), 5)
  const usdToETH = (value: number) =>
    roundToDecimals(Number(value) / (currencies?.value?.ETH ?? 0), 5)


  const ixtPrice = computed(() => currencies.value?.IXT)
  const maticPrice = computed(() => currencies.value?.MATIC)
  const ethPrice = computed(() => currencies.value?.ETH)

  return {
    ixtPrice,
    maticPrice,
    ethPrice,
    ixtToUSD,
    usdToIXT,
    maticToUSD,
    usdToMatic,
    ethToUSD,
    usdToETH,
    setupCurrencyPrice
  }

}