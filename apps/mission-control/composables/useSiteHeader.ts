export interface HeaderCategory {
  type: string,
  items: string[]
}


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
  useAsyncState('site-header-menu', async () => {
    const request = (await $fetch('https://api.planetix.app/api/v1/navigation')) as HeaderRequest

    return request?.data ?? []
  })
