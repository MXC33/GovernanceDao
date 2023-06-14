import { IXToken } from "@ix/base/composables/Token/useIXToken"
import { AdjustableNumber } from "@ix/base/composables/Utils/useAdjustableNumber"


export const useSelection = () => {


  interface SelectedItem extends IXToken { }
  const selectedItems = useState<SelectedItem[]>('selected-items', () => [])
  const viewingSelectedItems = useState('selected-items-visible', () => false)

  const selectedItemsIsSameCollection = computed(() => {
    const selectedItemsCollection = selectedItems.value.map(item => item.collection)

    return selectedItemsCollection.every(val => val === selectedItemsCollection[0]);
  })

  const removeSelectedItem = (selectedItem: IXToken) => {

    const index = selectedItems.value.findIndex((item) =>
      selectedItem.token_id == item.token_id
    )

    selectedItems.value.splice(index, 1)
  }

  const isItemSelected = (token: IXToken) => {
    return !!selectedItems.value.find((item) =>
      token.token_id == item.token_id
    )
  }

  const selectItem = (token: IXToken) => {
    selectedItems.value.push(token)
    console.log(selectedItems.value)

    viewingSelectedItems.value = true
  }

  const clearSelectedItems = () => {
    selectedItems.value = []
  }
  return {
    selectedItems,
    viewingSelectedItems,
    selectedItemsIsSameCollection,
    isItemSelected,
    removeSelectedItem,
    selectItem,
    clearSelectedItems

  }
}