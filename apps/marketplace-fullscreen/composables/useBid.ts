
export const useBids = () => {


  const getPixFloorPrices = () =>
    useAsyncDataState('pix-floor-price', async () => await $fetch('/web3/floor-prices/0'))


  const getAreasFloorPrices = () =>
    useAsyncDataState('area-floor-price', async () => await $fetch('/web3/floor-prices/1'))

  const getSectorsFloorPrices = () =>
    useAsyncDataState('zone-floor-price', async () => await $fetch('/web3/floor-prices/2'))


  const getZonesFloorPrices = () =>
    useAsyncDataState('zone-floor-price', async () => await $fetch('/web3/floor-prices/3'))


  const getDomainsFloorPrices = () =>
    useAsyncDataState('domain-floor-price', async () => await $fetch('/web3/floor-prices/4'))


  const getBundleSales = (sale_id: number | string) =>
    useAsyncDataState('bundle-sale', async () => await $fetch('/map/bundle/pix/' + sale_id))


  const getSaleExtraInfo = async (index: string, referenceId: number, saleId?: number, saleBundleLength?: number, type?: number) => await $fetch('/web3/asset/info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      index,
      referenceId,
      saleId,
      saleBundleLength,
      type
    })
  })


  const toggleFavorite = async (index: string, referenceId: number, isFavorite: boolean) => {
    if (isFavorite)
      return await $fetch('/favorites/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          index,
          referenceId,
          isFavorite,
        })
      })

    return await $fetch('/favorites/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        index,
        referenceId,
        isFavorite,
      })
    })
  }

  const bid = async (index: string, referenceId: number, price: number, message: string, sale_id?: number) => await $fetch('/web3/bid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      index,
      referenceId,
      sale_id,
      price,
      message
    })
  })


  const removeBid = async (index: string, referenceId: number, playerId: number, saleId?: number) => await $fetch('/web3/bid/remove/' + playerId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      index,
      referenceId,
      saleId,
      playerId,
    })
  })

  const rejectBid = async (index: string, referenceId: number, playerId: number, saleId?: number) => await $fetch('/web3/bid/reject/' + playerId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      index,
      referenceId,
      saleId,
      playerId,
    })
  })

  const rejectAllBid = async (index: string, referenceId: number, saleId?: number) => await $fetch('/web3/bid/reject/all', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      index,
      referenceId,
      saleId,
    })
  })

  const acceptBid = async (index: string, referenceId: number, saleId?: number) => await $fetch('/web3/sale/accept', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      index,
      referenceId,
      saleId,
    })
  })

  const counterBid = async (index: string, referenceId: number, saleId?: number) => await $fetch('/web3/bid/counter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      index,
      referenceId,
      saleId,
    })
  })

  const listAssets = async () => await $fetch('/web3/sale', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({

    })
  })

  const updateListAssets = async () => await $fetch('/web3/sale/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({

    })
  })

  const removeListAssets = async () => await $fetch('/web3/sale/remove', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({

    })
  })

}