import { IXToken, Sale } from "@ix/base/composables/Token/useIXToken"
import { UnlistingItem } from "~/composables/useListing"

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
  const { fetchIXAPI } = useIXAPI()

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


  const removeList = ({ _index, token_id, collection, network }: IXToken, sale: Sale) => {
    return fetchIXAPI('web3/sale/remove', 'POST', {
      index: _index,
      token_id,
      sale_id: sale.sale_id,
      network,
      collection,
    })
  }

  return {
    listAssets,
    updateListAssets,
    removeList
  }
}
