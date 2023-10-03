interface PriceResponse {
  price: number
}

export const useIXTPrice = () => {
  const config = useRuntimeConfig().public

  const { data: ixtPrice, refresh: refreshIXTPrice, execute: fetchPrice } = useAsyncDataState('ixt-price', () =>
    $fetch(config.MC_API + '/ixt-price', { mode: 'cors' }) as Promise<PriceResponse>, {
    transform: (data) => Number(data)
  })

  const setupIXTPrice = () => {
    useIntervalFn(() => { refreshIXTPrice() }, 1000 * 60)
    return refreshIXTPrice()
  }

  const ixtToUSD = (ixt: number) =>
    roundToDecimals(Number(ixt) * (ixtPrice?.value ?? 0), 5)

  const usdToIXT = (usd: number) =>
    roundToDecimals(Number(usd) / (ixtPrice?.value ?? 0), 5)

  return {
    ixtPrice,
    ixtToUSD,
    usdToIXT,
    setupIXTPrice
  }

}