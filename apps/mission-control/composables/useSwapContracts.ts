import { ethers } from "ethers"
import { IXTAddress } from "./NFTs/walletAddresses";


export const useContractHistory = (address: string) => {
  const history = new ethers.providers.EtherscanProvider();

  return useAsyncState('history-' + address, () =>
    history.getHistory(address)
  )
}
