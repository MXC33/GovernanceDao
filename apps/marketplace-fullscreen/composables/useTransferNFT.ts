import { BigNumber, BigNumberish, ContractTransaction, ethers } from "ethers";
import { MaybeRef, get } from "@vueuse/core";
export const useTransferNFT = () => {

  interface TransferContract {

    safeTransferFrom(
      from: string,
      to: string,
      id: BigNumberish,
      amount: BigNumberish,
      data: string,
    ): Promise<ContractTransaction>;
  }

  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

  const { walletAdress } = useWallet()

  const transferNFT = async (contract: MaybeRef<TransferContract>, to: string, tokenId: string | number, amount: number) => {
    const fromContract = get(contract)

    if (!walletAdress.value)
      return false

    try {
      return await fromContract.safeTransferFrom(walletAdress.value, to, tokenId, amount, ZERO_ADDRESS)
    } catch {
      console.log("error")
    }

  }

  return {
    transferNFT
  }
}