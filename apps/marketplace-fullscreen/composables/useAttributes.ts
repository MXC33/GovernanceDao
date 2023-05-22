import { SingleItemData } from "@ix/base/composables/Token/useIXToken"
import { CollectionData } from "./useCollection"

export interface Attribute<K> {
  key: keyof K & string,
  value?: string,
  hasToken?: boolean
}

const collectionAttributes: Attribute<CollectionData>[] = [
  {
    key: 'total_volume',
    hasToken: true
  },
  {
    key: 'sale_price',
    hasToken: true
  },
  { key: 'listed' },
  { key: 'unique_owners' },
  { key: 'owners' },
  { key: 'floor_price' }
]

const singleItemAttributes: Attribute<SingleItemData>[] = [
  {
    key: 'sale_price',
    hasToken: true
  }
]

export const useDefaulAttributes = () => {

  const getSingleAttributes = (list: SingleItemData) =>
    singleItemAttributes.map((item) => ({
      ...item,
      value: list[item.key]
    }))

  const getCollectionAttributes = (list: CollectionData) =>
    collectionAttributes.map((item) => ({
      ...item,
      value: list[item.key]
    }))

  return {
    getSingleAttributes,
    getCollectionAttributes
  }

}