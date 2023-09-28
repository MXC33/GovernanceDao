export const useStickyOffsets = () => {
  const { siteHeaderOffset, siteHeaderScrollOffset } = useSiteHeader()

  const pageHeaderHeight = useState('page-header-height', () => 0)
  const filterHeaderHeight = useState('filter-header-height', () => 0)

  const pageHeaderOffset = computed(() =>
    siteHeaderOffset.value + pageHeaderHeight.value + siteHeaderScrollOffset.value
  )

  const filterHeaderOffset = computed(() =>
    pageHeaderOffset.value + filterHeaderHeight.value
  )

  return {
    siteHeaderScrollOffset,
    filterHeaderHeight,
    pageHeaderHeight,
    siteHeaderOffset,
    pageHeaderOffset,
    filterHeaderOffset
  }
}