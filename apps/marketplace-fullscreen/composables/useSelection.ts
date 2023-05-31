import { IXToken } from "@ix/base/composables/Token/useIXToken"
import { AdjustableNumber } from "@ix/base/composables/Utils/useAdjustableNumber"


export const useSelection = () => {


  interface SelectedItem extends AdjustableNumber {
    token: IXToken,
  }
  const selectedItems = useState<SelectedItem[]>('selected-items', () => [])
  const viewingSelectedItems = useState('selected-items-visible', () => false)

  const removeSelectedItem = (selectedItem: IXToken) => {

    const index = selectedItems.value.findIndex((item) =>
      selectedItem.token_id == item.token.token_id
    )

    selectedItems.value.splice(index, 1)
  }

  const selectItem = (token: IXToken) => {
    selectedItems.value.push({
      token,
      min: 1,
      max: Infinity,
      value: 1
    })
    console.log(selectedItems.value)

    viewingSelectedItems.value = true
  }

  const clearSelectedItems = () => {
    selectedItems.value = []
  }
  return {
    selectedItems,
    viewingSelectedItems,
    removeSelectedItem,
    selectItem,
    clearSelectedItems

  }
}