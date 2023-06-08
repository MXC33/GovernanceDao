export const onMobile = () => {

  const { width } = useWindowSize()
  const mounted = useMounted()
  return computed(() => {
    if (!process.client || !mounted.value)
      return false

    return width.value < 640
  })
}