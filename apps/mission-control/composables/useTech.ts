
export const useTech = () => {
  const techItems: string[] = ['drone', 'rover']
  const { data: nfts } = useTokenData()
  const { data: rovers } = useRoverData()

  const droneList = computed(() => {
    return nfts.value.filter((item) =>
      techItems.includes(item?.tokenInfo?.type)
    )
  })

  const roverList = computed(() => {
    return rovers.value.filter((item) =>
      techItems.includes(item?.tokenInfo?.type)
    )
  })

  return {
    droneList,
    roverList
  }
}