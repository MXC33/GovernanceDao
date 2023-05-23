import { ERC1155Addresses, ERC721Addresses, get1155Contract } from "./useAssetContracts";
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as const


export const useTransferNFT = () => {

  const is1155Contract = (contractAddress: string) => {

    if (ERC1155Addresses.includes(contractAddress.toLowerCase()))
      return true
    return false
  }

  const getContract = (contractAddress: string) => {

    if (ERC1155Addresses.includes(contractAddress.toLowerCase()))
      return get1155Contract(contractAddress)
    if (ERC721Addresses.includes(contractAddress.toLowerCase()))
      return get721Contract(contractAddress)

    return null
  }

  const transferNFT = async (contractAddress: string, to: string, tokenId: number, amount?: number) => {

    const erc721Contract = get1155Contract(contractAddress)
    const erc1155Contract = get721Contract(contractAddress)


    if (!erc721Contract || !erc1155Contract)
      return console.error("NO CONTRACT SET UP")

    if (amount)
      return erc721Contract.transfer1155Token(to, tokenId, amount)

    return erc1155Contract.transfer721Token(to, tokenId)
  }

  return {
    transferNFT
  }
}