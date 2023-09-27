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

export const useHeaderData = () =>
  useAsyncDataState('site-header-menu', async () => {
    const request = (await $fetch(BASE_API_ENDPOINT_URL() + '/navigation')) as HeaderRequest

    return request?.data ?? []
  });


export const useSiteHeader = () => {
  const activeHeaderIndex = useState<number | null>('header-active-index', () => null)

  const headerHeight = useState<number>('header-height', () => 0)
  const isScrollingDown = useState<boolean>('header-is-scrolling-down', () => false)

  const siteHeaderScrollOffset = computed(() =>
    isScrollingDown.value ? -headerHeight.value : 0
  )

  const siteHeaderOffset = computed(() =>
    headerHeight.value
  )

  return {
    activeHeaderIndex,
    isScrollingDown,
    siteHeaderScrollOffset,
    siteHeaderOffset,
    headerHeight
  }
};
