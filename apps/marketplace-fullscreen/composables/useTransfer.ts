import { IXToken } from "@ix/base/composables/Token/useIXToken"
import { TransactionItem } from "./useTransactions"

export interface TransferItem extends TransactionItem {
  token: IXToken,
  toWallet?: string
}

export const useTransfer = () => {
  const transferItem = useState<TransferItem[]>('transfer-items', () => [])
  const viewingTransferItem = useState('transfer-visible', () => false)

  const removeFromTransferList = (token: IXToken) => {

    const index = transferItem.value.findIndex((item) => item.token.token_id == token.token_id)
    console.log("remove", index, token.token_id, transferItem.value.map((item) => item.token.token_id))
    transferItem.value.splice(index, 1)
  }

  const addToTransferList = (token: IXToken) => {
    transferItem.value.push({
      token,
      shares: {
        min: 1,
        max: token?.my_shares,
        value: 1
      }
    })

    viewingTransferItem.value = true
  }

  const clearTransferList = () => {
    transferItem.value = []
  }

  return {
    transferItem,
    viewingTransferItem,
    removeFromTransferList,
    addToTransferList,
    clearTransferList
  }
}
