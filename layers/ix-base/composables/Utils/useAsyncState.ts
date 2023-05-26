
interface AsyncStateOptions<T, O> {
  page?: MaybeRef<number>,
  transform?: (input: T) => O
}

interface AsyncStateReturnType<T> {
  execute: () => Promise<void>,
  refresh: () => Promise<void>,
  pending: Ref<boolean>,
  data: Ref<T | null>
}

export function useAsyncDataState<T, O>(key: string, fetchData: () => Promise<T>, options: AsyncStateOptions<T, O>): AsyncStateReturnType<O>

export function useAsyncDataState<T>(key: string, fetchData: () => Promise<T>): AsyncStateReturnType<T>

export function useAsyncDataState<T extends O, O>(key: string, fetchData: () => Promise<T>, options?: AsyncStateOptions<T, O>): AsyncStateReturnType<O> {
  const data = useState<O | null>(key, () => null)
  const pending = useState(key + '-pending', () => false)
  const defaultTransform = (data: T) => data
  const transform = options?.transform ?? defaultTransform

  const fetchNewData = async () => {
    pending.value = true
    const response = await fetchData()
    data.value = transform(response)
    pending.value = false
  }

  const execute = async () => {
    if (pending.value || data.value !== null)
      return

    await fetchNewData()
    return
  }

  const refresh = async () =>
    await fetchNewData()

  return {
    execute,
    refresh,
    pending,
    data
  }
}
export function useAsyncDataStatePagination<T extends O, O>(key: string, fetchData: () => Promise<T>, options?: AsyncStateOptions<T, O>): AsyncStateReturnType<O> {
  const data = useState<CollectionData | null>(key, () => null)
  const pending = useState(key + '-pending', () => false)
  const defaultTransform = (data: T) => data
  const transform = options?.transform ?? defaultTransform

  const fetchNewData = async () => {
    pending.value = true
    const response = await fetchData()
    const transformedResponse = transform(response) as CollectionData

    if (!data.value)
      data.value = transformedResponse
    else {
      data.value.page_key = transformedResponse.page_key
      data.value.nfts = data.value.nfts.concat(transformedResponse.nfts)
    }
    pending.value = false
  }

  const execute = async () => {
    if (pending.value || data.value !== null)
      return

    await fetchNewData()
    return
  }

  const refresh = async () =>
    await fetchNewData()

  return {
    execute,
    refresh,
    pending,
    data
  }
}
