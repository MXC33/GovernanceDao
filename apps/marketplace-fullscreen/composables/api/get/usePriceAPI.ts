import { BASE_API_ENDPOINT_URL } from "../api"


export const usePixFloorPriceData = () =>
  useAsyncDataState('pix-floor-price', () =>
    $fetch(BASE_API_ENDPOINT_URL + '/web3/floor-prices/0')
  )


export const useAreasFloorPriceData = () =>
  useAsyncDataState('area-floor-price', () =>
    $fetch(BASE_API_ENDPOINT_URL + '/web3/floor-prices/1')
  )

export const useSectorsFloorPriceData = () =>
  useAsyncDataState('zone-floor-price', () =>
    $fetch(BASE_API_ENDPOINT_URL + '/web3/floor-prices/2')
  )


export const useZonesFloorPriceData = () =>
  useAsyncDataState('zone-floor-price', () =>
    $fetch(BASE_API_ENDPOINT_URL + '/web3/floor-prices/3')
  )


export const useDomainsFloorPriceData = () =>
  useAsyncDataState('domain-floor-price', () =>
    $fetch(BASE_API_ENDPOINT_URL + '/web3/floor-prices/4')
  )


export const useBundleSaleData = (sale_id: number | string) =>
  useAsyncDataState('bundle-sale-' + sale_id, () =>
    $fetch(BASE_API_ENDPOINT_URL + '/map/bundle/pix/' + sale_id)
  )
