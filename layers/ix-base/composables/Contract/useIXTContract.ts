import { BigNumberish, ethers } from "ethers"
import { ContractInterface } from "../Utils/defineContract"
import { ContractContext as IXTokenContract } from '@ix/base/composables/Contract/Abis/IXToken'
import IXToken from '@ix/base/composables/Contract/Abis/IXToken.json'


export const useIXTContract = <T extends ContractInterface<T> & IXTokenContract>() => {

  const spenderAddress = conduitAdress.polygon as string
  const { walletAdress } = useWallet()

  const { viewAsyncState, withContract, createTransaction, ...contractSpec } = defineContract<T>('IXToken-contract', {
    contractAddress: IXTAddress.polygon as string,
    notifications: {
      failMessage: 'Error allowance IXToken'
    },
    createContract(provider) {
      return new ethers.Contract(IXTAddress.polygon as string, IXToken.abi, provider.getSigner()) as unknown as T
    }
  })


  const { execute: fetchIXT, data: ixtBalance, refresh: refreshIXTBalance } = viewAsyncState('ixt-balance', async (contract) => {
    const address = walletAdress.value
    if (!address)
      return 0

    const balance = await contract.balanceOf(address)
    return Number(ethers.utils.formatUnits(balance))
  })


  const allowance = () =>
    withContract((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      /*return new Promise(async (resolve, reject) => {
        try {
          const allowance = await contract.allowance(address, spenderAddress)
          resolve(Number(ethers.utils.formatUnits(allowance)))
        } catch (e) {
          resolve(0)
        }
      })*/
      return contract.allowance(address, spenderAddress)
    })

  const approve = (amount: BigNumberish | string) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.approve(spenderAddress, amount)
    })

  const allowanceCheck = async (amount: number) => {
    try {
      const allowanceValue = Number(ethers.utils.formatUnits(await allowance()))

      if (allowanceValue >= amount)
        return true

      return await approve(ethers.utils.parseUnits(amount.toString()))

    } catch (e) {
      return false
    }
  }

  return {
    ...contractSpec,
    allowance,
    approve,
    allowanceCheck,
    ixtBalance,
    fetchIXT,
    refreshIXTBalance
  }
}