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

export const useHeaderIndex = () => shallowRef<number | null>(null)

export const useSiteHeader = () => {
  type Currency = 'IXT' | 'aGold'
  const activeCurrency = useState<Currency>('active-currency', () => 'IXT')
  const setActiveCurrency = (currency: Currency) => {
    activeCurrency.value = currency
  }

  const headerHeight = useState<number>('header-height', () => 24)

  return {
    activeCurrency,
    setActiveCurrency,
    headerHeight
  }
};
