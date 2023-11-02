import { BigNumberish, ethers } from "ethers"
import { ContractInterface } from "../Utils/defineContract"
import { ContractContext as IXTokenContract } from '@ix/base/composables/Contract/Abis/IXToken'
import IXToken from '@ix/base/composables/Contract/Abis/IXToken.json'
import { useActiveChain } from "~/composables/Contract/useWallet";


export const useIXTContract = <T extends ContractInterface<T> & IXTokenContract>() => {

  const spenderAddress = conduitAdress[useActiveChain()] as string
  const { walletAdress } = useWallet()

  const { viewAsyncState, withContract, createTransaction, ...contractSpec } = defineContract<T>('IXToken-contract', {
    contractAddress: IXTAddress[useActiveChain()] as string,
    notifications: {
      failMessage: 'Error allowance IXToken'
    },
    createContract(provider) {
      return new ethers.Contract(IXTAddress[useActiveChain()] as string, IXToken.abi, provider.getSigner()) as unknown as T
    }
  })


  const { execute: fetchIXT, data: ixtBalance, refresh: refreshIXTBalance, pending: ixtPending } = viewAsyncState('ixt-balance', async (contract) => {
    console.log("WALLET", walletAdress.value, contract)
    const address = walletAdress.value
    if (!address)
      return 0

    const balance = await contract.balanceOf(address)
    console.log("GET BALANCE", balance)
    return Number(ethers.utils.formatUnits(balance))
  })


  const allowance = (otherSpenderAddress: string = '') =>
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
      return contract.allowance(address, otherSpenderAddress || spenderAddress)
    })

  const approve = (amount: BigNumberish | string, otherSpenderAddress: string = '') =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.approve(otherSpenderAddress || spenderAddress, amount)
    })

  const allowanceCheck = async (amount: number, otherSpenderAddress: string = '') => {
    try {
      const allowanceValue = Number(ethers.utils.formatUnits(await allowance(otherSpenderAddress)))

      if (allowanceValue >= amount)
        return true

      return await approve(ethers.utils.parseUnits(amount.toString()), otherSpenderAddress)

    } catch (e) {
      return false
    }
  }

  const allowanceCheckWithError = async (amount: number, otherSpenderAddress: string = '') => {
    const allowanceValue = Number(ethers.utils.formatUnits(await allowance(otherSpenderAddress)))

    if (allowanceValue >= amount)
      return true

    return await approve(ethers.utils.parseUnits(amount.toString()), otherSpenderAddress)
  }

  return {
    ...contractSpec,
    allowance,
    approve,
    allowanceCheck,
    allowanceCheckWithError,
    ixtPending,
    ixtBalance,
    fetchIXT,
    refreshIXTBalance
  }
}
