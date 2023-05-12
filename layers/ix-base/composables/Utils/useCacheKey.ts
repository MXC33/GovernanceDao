export const useCacheKey = () => {
  const config = useRuntimeConfig().public

  const addCacheKey = (url: string) =>
    `${url}?v=${config.cacheKey}`

  return {
    addCacheKey
  }
}