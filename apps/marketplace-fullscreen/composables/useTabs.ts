export type SingleItemTabType = 'details' | 'offers' | 'listings' | 'item-activity'
// const singleItemTabs: SingleItemTab[] = ['details', 'offers', 'listings', 'item-activity']

export interface SingleItemTabs {
  tabs: SingleItemTabType,
}

export const useTabs = () => {
  const singleItemTabs = useState<SingleItemTabs[]>('tabs', () => [])

  return {
    singleItemTabs
  }
}