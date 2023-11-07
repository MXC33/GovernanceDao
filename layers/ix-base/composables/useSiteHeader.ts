export interface HeaderRequest {
  success: boolean
  status: number
  message: string
  data: HeaderMenuItem[]
}

export interface HeaderMenuItem {
  id: string
  name: string
  image?: string
  order: number
  created_at: string
  updated_at: string
  subNavigations: HeaderMenuSubNavigation[]
  navigationMedia?: NavigationMedia
}

export interface HeaderMenuSubNavigation {
  id: string
  title: string
  item: HeaderMenuSubNavigationItem[]
  col_span: number
  created_at: string
  updated_at: string
}

export interface HeaderMenuSubNavigationItem {
  name: string
  description: string
  icon: string
  absolute_url: string
  modal_type: string
}

export interface NavigationMedia {
  id: number
  name: string
}




export const useSiteHeader = () => {
  const activeHeaderIndex = useState<number | null>('header-active-index', () => null)

  const headerHeight = useState<number>('site-header-height', () => 0)
  const isScrollingDown = useState<boolean>('header-is-scrolling-down', () => false)

  const autoHideActive = useState<boolean>('header-auto-hide', () => false)

  const siteHeaderScrollOffset = computed(() =>
    (isScrollingDown.value && autoHideActive.value) ? -headerHeight.value : 0
  )


  const siteHeaderOffset = computed(() =>
    headerHeight.value
  )

  const closeHeaderMenu = () => {
    activeHeaderIndex.value = null
  }

  const fetchHeaderData = () =>
    useAsyncDataState('site-header-menu', async () => {
      const request = (await $fetch(BASE_API_ENDPOINT_URL() + '/navigation')) as HeaderRequest

      return request?.data ?? []
    });

  return {
    closeHeaderMenu,
    fetchHeaderData,
    activeHeaderIndex,
    autoHideActive,
    isScrollingDown,
    siteHeaderScrollOffset,
    siteHeaderOffset,
    headerHeight
  }
};
