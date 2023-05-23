import { getAssetContract } from "./useAssetContracts";
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as const


export const useTransferNFT = (contractAdress: string) => {
  const contract = getAssetContract(contractAdress)

  const transferNFT = (to: string, tokenId: string, amount: string) => {
    if (!contract)
      return

    contract.transferNFT(to, tokenId, amount)
  }

  return {
    transferNFT
  }
}