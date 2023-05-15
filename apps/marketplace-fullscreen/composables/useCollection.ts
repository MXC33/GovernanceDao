export type CollectionDisplayType = 'list' | 'grid'

export const useCollection = () => {
  const displayType = useState<CollectionDisplayType>('collection-display-type', () => 'grid')

  const toggleDisplayType = () => {
    if(displayType.value == 'grid')
      return displayType.value = 'list'
    else 
      return displayType.value = 'grid'
  }

  return {
    toggleDisplayType,
    displayType
  }
}