import { BASE_API_ENDPOINT_URL } from "./useBidEndpoints"

export const useListEndpoints = () => {

  const listAssets = async () => await $fetch(BASE_API_ENDPOINT_URL + '/web3/sale', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({

    })
  })

  const updateListAssets = async () => await $fetch(BASE_API_ENDPOINT_URL + '/web3/sale/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({

    })
  })

  const removeListAssets = async () => await $fetch(BASE_API_ENDPOINT_URL + '/web3/sale/remove', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
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