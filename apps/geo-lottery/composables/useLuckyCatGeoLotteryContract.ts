import { BigNumberish, ethers } from "ethers"
import { ContractInterface } from "@ix/base/composables/Utils/defineContract"
import { ContractContext as LuckyCatGeoLotteryContract } from '@ix/base/composables/Contract/Abis/LuckyCatGeoLottery'
import LuckyCatGeoLottery from '@ix/base/composables/Contract/Abis/LuckyCatGeoLottery.json'
import {luckyCatGeoLotteryAdress} from "@ix/base/composables/Contract/WalletAddresses";


export const useLuckyCatGeoLotteryContract = <T extends ContractInterface<T> & LuckyCatGeoLotteryContract>() => {

  const { walletAdress } = useWallet()

  const { withContract, ...contractSpec } = defineContract<T>('LuckyCatGeoLottery-contract', {
    contractAddress: IXTAddress.polygon as string,
    notifications: {
      failMessage: 'Error allowance IXToken'
    },
    createContract(provider) {
      return new ethers.Contract(luckyCatGeoLotteryAdress.polygon as string, LuckyCatGeoLottery.abi, provider.getSigner()) as unknown as T
    }
  })

  const enterLottery = (entries: number) =>
    withContract((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.enterLottery(entries)
    })

  return {
    ...contractSpec,
    enterLottery
  }
}
