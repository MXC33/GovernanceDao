import { get1155Contract } from "./useAssetContracts";

export const useTransferNFT = () => {

  const transferERC721NFT = async (contractAddress: string, to: string, tokenId: number) => {

    const contract = get721Contract(contractAddress)

    if (!contract)
      return console.error("NO CONTRACT SET UP")

    return contract.transfer721Token(to, tokenId)
  }

  const transferERC1155NFT = async (contractAddress: string, to: string, tokenId: number, amount: number) => {

    const contract = get1155Contract(contractAddress)

    if (!contract)
      return console.error("NO CONTRACT SET UP")

    return contract.transfer1155Token(to, tokenId, amount)
  }

  return {
    transferERC721NFT,
    transferERC1155NFT
  }
}