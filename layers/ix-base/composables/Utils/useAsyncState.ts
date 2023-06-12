
interface AsyncStateOptions<T, O> {
  mergePages?: (oldData: O, newData: O) => O,
  transform?: (input: T) => O
}

interface AsyncStateReturnType<T> {
  execute: () => Promise<void>,
  refresh: () => Promise<void>,
  fetchAndMerge: () => Promise<void>,
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
  const nuxt = useNuxtApp()

  const fetch = async () => {
    if (nuxt.isHydrating)
      return data.value

    if (process.client)
      pending.value = true

    const response = await fetchData()
    const fetchedData = transform(response)

    if (process.client)
      pending.value = false

    return fetchedData
  }

  const fetchNewData = async () => {
    data.value = await fetch()
  }

  const fetchAndMerge = async () => {
    const response = await fetch()

    const mergePagesFn = options?.mergePages
    const oldData = data.value

    if (!oldData) {
      data.value = response
      return
    }

    if (mergePagesFn && response) {
      data.value = mergePagesFn(oldData, response)
    } else {
      data.value = response
    }
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
    fetchAndMerge,
    pending,
    data
  }
}