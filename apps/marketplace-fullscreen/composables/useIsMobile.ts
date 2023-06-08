export const onMobile = () => {

  const { width } = useWindowSize()

  return computed(() => {
    if (!process.client)
      return false

    return width.value < 640
  })
}