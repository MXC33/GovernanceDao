import {BASE_API_ENDPOINT_URL, useIXHeaders} from "../api"
export interface ListingAssets {
  index: string,
  token_id: number,
  quantity: number,
  network: string,
  collection: string
}

export interface ListingsBody {
  sale_message: string,
  sale_price: number,
  sale_endtime: number
  sale_type: number,
  assets: ListingAssets[],
}

export const useListEndpoints = () => {

  const headers = useIXHeaders()

  const listAssets = async (body: ListingsBody[]) => await $fetch(BASE_API_ENDPOINT_URL + '/web3/sale', {
    method: 'POST',
    headers: {
      ...headers.value
    },
    body: JSON.stringify(body)
  })

  const updateListAssets = async () => await $fetch(BASE_API_ENDPOINT_URL + '/web3/sale/update', {
    method: 'POST',
    headers: {
      ...headers.value
    },
    body: JSON.stringify({

    })
  })

  const removeListAssets = async () => await $fetch(BASE_API_ENDPOINT_URL + '/web3/sale/remove', {
    method: 'POST',
    headers: {
      ...headers.value
    },
    body: JSON.stringify({

    })
  })

  return {
    listAssets,
    updateListAssets,
    removeListAssets
  }
}
