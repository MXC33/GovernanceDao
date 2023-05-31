interface PriceResponse {
  price: number
}

export const useIXTPrice = () => {
  const config = useRuntimeConfig().public
  console.log("", config.MC_API)

  const { data: ixtPrice, refresh: refreshIXTPrice, execute: fetchPrice } = useAsyncDataState('ixt-price', () =>
    $fetch(config.MC_API + '/ixt-price', { mode: 'cors' }) as Promise<PriceResponse>, {
    transform: (data) => Number(data)
  })

  const setupIXTPrice = () => {
    useIntervalFn(() => { refreshIXTPrice() }, 1000 * 60)
    return fetchPrice()
  }

  const ixtToUSD = (ixt: number) =>
    roundToDecimals(Number(ixt) * (ixtPrice?.value ?? 0), 2)

  const ixtAsUSD = (ixt: number) => computed(() =>
    roundToDecimals(Number(ixt) * (ixtPrice?.value ?? 0), 2)
  )

  return {
    ixtPrice,
    ixtAsUSD,
    ixtToUSD,
    setupIXTPrice
  }

}