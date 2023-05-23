import { getAssetContract } from "./useAssetContracts";
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as const


export const useTransferNFT = () => {

  const transferNFT = (contractAdress: string, to: string, tokenId: number, amount: number) => {
    const contract = getAssetContract(contractAdress)

    if (!contract)
      return console.error("No Contract found")

    console.log("I AM HERE")
    console.log("contract", contract)
    return contract.transferNFT(to, tokenId, amount)
  }

  return {
    transferNFT
  }
}