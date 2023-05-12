export const useCacheKey = () => {
  // const config = useRuntimeConfig().public

  const addCacheKey = (url: string) =>
    `${url}?v=${1}`

  return {
    addCacheKey
  }
}