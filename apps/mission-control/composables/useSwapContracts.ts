import { ethers } from "ethers"
import { IXTAddress } from "@ix/base/composables/Contract/WalletAddresses";


export const useContractHistory = (address: string) => {
  const history = new ethers.providers.EtherscanProvider();

  return useAsyncDataState('history-' + address, () =>
    history.getHistory(address)
  )
}
