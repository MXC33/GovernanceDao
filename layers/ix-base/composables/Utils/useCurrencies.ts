const IXT_KEY = 'user-ixt-balance'

export type Currency = 'ixt' | 'usdt' | 'usdc' | 'matic' | 'weth' | 'usd' | 'visa' | 'astro-credit' | 'waste' | 'energy'

export interface Payment {
  paymentMethod: Currency,
  price: number
}
export const useCurrencyData = () => {
  const { data: mcNFTs, execute: fetchTokenData } = useTokenData()

  const asyncState = useAsyncDataState(IXT_KEY, () => {
    const credentials = useGraphqlCredentials()
    return GqlCurrencies({ credentials })
  }, {
    transform: (data) => data.currencies
  })

  const fetchAllCurrencies = async () =>
    await Promise.all([fetchTokenData(), asyncState.execute()])

  const currencyToken = (type: string) =>
    asyncState.data.value?.find(item => item.tokenInfo.type == type)

  const mcToken = (type: string) =>
    mcNFTs.value?.find(item => item.tokenInfo.type == type)

  const ixtToken = computed(() => currencyToken('ixt'))

  const astroGoldToken = computed(() => currencyToken('astro-gold'))

  const astroGoldLiteToken = computed(() => currencyToken('astro-gold-lite'))

  const astroCreditToken = computed(() => mcToken('astro-credit'))

  const wasteToken = computed(() => mcToken('waste'))

  const energyToken = computed(() => mcToken('energy'))

  const ixtBalance = computed(() =>
    ixtToken.value?.balance ?? 0
  )

  const wasteBalance = computed(() =>
    wasteToken.value?.balance ?? 0
  )

  const energyBalance = computed(() =>
    energyToken.value?.balance ?? 0
  )

  const astroGoldBalance = computed(() =>
    astroGoldToken.value?.balance ?? 0
  )

  const astroGoldLiteBalance = computed(() =>
    astroGoldLiteToken.value?.balance ?? 0
  )

  const astroCreditBalance = computed(() =>
    astroCreditToken.value?.balance ?? 0
  )

  const formattedIXTBalance = computed(() =>
    roundToDecimals(ixtToken.value?.balance ?? 0, 2)
  )

  const getCurrencyToken = (currency: Currency) => {
    switch (currency) {
      case 'astro-credit':
        return astroCreditToken.value
      case 'ixt':
        return ixtToken.value
      case 'waste':
        return wasteToken.value
      case 'energy':
        return energyToken.value
    }
  }

  return {
    ...asyncState,
    ixtToken,
    ixtBalance,
    formattedIXTBalance,
    astroCreditToken,
    astroCreditBalance,
    astroGoldToken,
    astroGoldBalance,
    astroGoldLiteToken,
    astroGoldLiteBalance,
    getCurrencyToken,
    fetchAllCurrencies
  }
}
