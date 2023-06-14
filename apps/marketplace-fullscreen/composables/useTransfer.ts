import { IXToken } from "@ix/base/composables/Token/useIXToken"
import { TransactionItem } from "./useTransactions"
import { get1155Contract } from "./useAssetContracts";


export interface TransferItem extends TransactionItem {
  type: 'transfer'
}

export interface TransferToWalletItem {
  items: TransferItem[]
  toWallet: string
}

export const useTransfer = () => {
  const transferItem = useState<TransferToWalletItem>('transfer-items')

  const createTransferItem = (items: IXToken[]) => {
    transferItem.value = {
      items: items.map((token) => ({
        type: 'transfer',
        token,
        shares: {
          min: 1,
          value: 1,
          max: token.my_shares
        },
      })),
      toWallet: ''
    }
  }

  const transferERC721NFT = async (contractAddress: string, items: TransferToWalletItem) => {

    const contract = get721Contract(contractAddress)

    if (!contract)
      return console.error("NO CONTRACT SET UP")

    if (items.items.length == 1)
      return contract.transfer721Token(items.toWallet, items.items[0].token.token_id)


    const tokenIds = items.items.map(item => item.token.token_id)
    return contract.batchTransfer721Token(items.toWallet, tokenIds)
  }

  const transferERC1155NFT = async (contractAddress: string, items: TransferToWalletItem) => {

    const contract = get1155Contract(contractAddress)

    if (!contract)
      return console.error("NO CONTRACT SET UP")

    if (items.items.length == 1)
      return contract.transfer1155Token(items.toWallet, items.items[0].token.token_id, items.items[0].shares.value)


    const tokenIds = items.items.map(item => item.token.token_id)
    const quantity = items.items.map(item => item.shares.value)

    return contract.batchTransfer1155Token(items.toWallet, tokenIds, quantity)
  }

  return {
    transferItem,
    createTransferItem,
    transferERC721NFT,
    transferERC1155NFT,
  }
}
