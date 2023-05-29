import { CollectionData, Collection, CollectionPayload } from "../../useCollection"

interface CollectionResponse {
  success: boolean
  status: number
  message: string
  data: CollectionData
}
interface CollectionsResponse {
  success: boolean
  status: number
  message: string
  data: Collection[]
}


export const useCollectionData = (slug: string, network = 'polygon') => {
  const { activeFilters, filtersAsPayload } = useCollectionSettings()
  const activePage = ref(0)

  const body = computed<CollectionPayload>(() => ({
    page_key: activePage.value,
    order: 0,
    filter: {
      owned: false,
      type: 0,
      search: "",
      attributes: filtersAsPayload.value
    }
  }))

  const setupCollectionListeners = (data: Ref<CollectionData>, refresh: () => Promise<void>) => {
    watch(activeFilters, () => {
      activePage.value = 0
      refresh()
      console.log("New filter")
    }, { deep: true })

    watch(data, (value) => {
      if (!value)
        return

      if (activeFilters.value.length < 1)
        createFilters(value)

      console.log("NEw data", value.nfts.length)

    }, { deep: true, immediate: true })
  }


  const asyncState = useAsyncDataState('collection-' + slug + body.value.page_key, () =>
    fetchIXAPI('collections/' + network + '/' + slug, 'POST', body.value) as Promise<CollectionResponse>, {
    transform: (item) => {
      console.log("Transformed the data", body.value)
      return item.data as CollectionData
    },
    mergePages: (oldData, newData) => {
      return {
        ...newData,
        nfts: oldData.nfts.concat(newData.nfts)
      }
    }
  })

  return {
    ...asyncState,
  }
}

export const useCollectionsData = (network = 'polygon') =>
  useAsyncDataState('collections', () =>
    fetchIXAPI('collections/?online=true') as Promise<CollectionsResponse>, {
    transform: (item) =>
      item.data as Collection[]
  })


export const usePersonalAssetAPI = (body: any, network = 'polygon') => {
  return useAsyncDataState('personal-nft-data-', () =>
    fetchIXAPI('collections/owned/' + network + '/', 'POST', body) as Promise<CollectionResponse>, {
    transform: (item) => {
      return item.data as CollectionData
    }
  })
}