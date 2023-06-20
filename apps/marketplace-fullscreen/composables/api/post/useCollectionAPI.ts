import { CollectionData, Collection, CollectionPayload } from "../../useCollection"
import { ServerSortOptions } from '../../useTable'

export interface CollectionResponse {
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

interface CollectionOptions {
  url?: string,
  filter?: {
    owned?: boolean,
    type?: number
    search?: string
  },
}

type Network = 'polygon' | 'ethereum'

export const useCollectionsURL = () => {
  const getCollectionURL = (slug: string, network: Network) =>
    'collections/' + network + '/' + slug

  const myAssetsURL = (network: Network) =>
    'collections/owned/' + network + '/'

  return {
    getCollectionURL,
    myAssetsURL
  }
}

export const useCollectionData = (url: string, options: CollectionOptions = {}) => {
  const { fetchIXAPI } = useIXAPI()

  const { activeFilters, filtersAsPayload, activeServerSort, activeSearchTerm, createFilters } = useCollectionSettings()
  const activePage = ref(0)

  const body = computed<CollectionPayload>(() => ({
    page_key: activePage.value,
    order: ServerSortOptions[activeServerSort.value ?? 'PRICE_ASC'],
    filter: {
      owned: options.filter?.owned ?? false,
      type: options.filter?.type ?? 0,
      search: activeSearchTerm.value ?? '',
      attributes: filtersAsPayload.value
    }
  }))

  const key = 'collection-' + url.replaceAll('/', '-') + body.value.page_key + options.filter?.type ?? ''

  const asyncState = useAsyncDataState(key, () =>
    fetchIXAPI(url, 'POST', body.value) as Promise<CollectionResponse>, {
    transform: (item) => {
      return item.data as CollectionData
    },
    mergePages: (oldData, newData) => {
      return {
        ...newData,
        nfts: oldData.nfts.concat(newData.nfts)
      }
    }
  })


  const setupCollectionListeners = () => {
    const refreshCollection = () => {
      activePage.value = 0
      asyncState.refresh()
    }

    watch([activeFilters, activeServerSort, activeSearchTerm], () => {
      refreshCollection()
    }, { deep: true })

    watch(asyncState.data, (value) => {
      if (!value)
        return

      if (activeFilters.value.length < 1)
        createFilters(value)

    }, { deep: true, immediate: true })
  }

  const loadNextPage = () => {
    activePage.value = Number(asyncState.data.value?.page_key)
    return asyncState.fetchAndMerge()
  }

  return {
    ...asyncState,
    loadNextPage,
    setupCollectionListeners
  }
}

export const useCollectionsData = (network = 'polygon', tokenSearch: '') => {
  const { fetchIXAPI } = useIXAPI()
  return useAsyncDataState('collections', () =>
    fetchIXAPI('collections/?online=true') as Promise<CollectionsResponse>, {
    transform: (item) =>
      item.data as Collection[]
  })
}