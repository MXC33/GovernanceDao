import { BASE_API_ENDPOINT_URL } from "../api"


export const useVariousDataEndpoints = () => {


  const addExtraSaleInfo = async (index: string, referenceId: number, saleId?: number, saleBundleLength?: number, type?: number) => await $fetch(BASE_API_ENDPOINT_URL + '/web3/asset/info', {
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

  return {
    addExtraSaleInfo,
    toggleFavorite,

  }
}