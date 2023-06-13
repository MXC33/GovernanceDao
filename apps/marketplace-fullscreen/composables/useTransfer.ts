import { IXToken } from "@ix/base/composables/Token/useIXToken"
import { TransactionItem } from "./useTransactions"
import { get1155Contract } from "./useAssetContracts";


export interface TransferItem extends TransactionItem {
  toWallet?: string
}

export const useTransfer = () => {
  const transferItem = useState<TransferItem[]>('transfer-items', () => [])

  const createTransferItem = (items: IXToken[], toWallet: string) => {
    transferItem.value = items.map((token) => ({
      type: 'transfer',
      token,
      shares: {
        min: 1,
        value: 1,
        max: token.my_shares
      },
      toWallet
    }))
  }

  const transferERC721NFT = async (contractAddress: string, to: string, items: TransferItem[]) => {

    const contract = get721Contract(contractAddress)

    if (!contract)
      return console.error("NO CONTRACT SET UP")

    if (items.length == 1)
      return contract.transfer721Token(to, items[0].token.token_id)


    const tokenIds = items.map(item => item.token.token_id)
    return contract.batchTransfer721Token(to, tokenIds)
  }

  const transferERC1155NFT = async (contractAddress: string, to: string, items: TransferItem[]) => {

    const contract = get1155Contract(contractAddress)

    if (!contract)
      return console.error("NO CONTRACT SET UP")

    if (items.length == 1)
      return contract.transfer1155Token(to, items[0].token.token_id, items[0].shares.value)


    const tokenIds = items.map(item => item.token.token_id)
    const quantity = items.map(item => item.shares.value)

    return contract.batchTransfer1155Token(to, tokenIds, quantity)
  }

  return {
    transferItem,
    createTransferItem,
    transferERC721NFT,
    transferERC1155NFT,
  }
}
