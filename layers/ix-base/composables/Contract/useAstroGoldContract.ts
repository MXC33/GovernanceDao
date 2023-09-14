import { BigNumberish, ethers } from "ethers"
import { ContractInterface } from "@ix/base/composables/Utils/defineContract"
import { ContractContext as AstroGoldTokenContract } from '@ix/base/composables/Contract/Abis/AstroGold'
import AstroGoldToken from '@ix/base/composables/Contract/Abis/AstroGold.json'
import { astroGoldAdress, luckyCatGeoLotteryAdress } from "@ix/base/composables/Contract/WalletAddresses";


export const useAstroGoldContract = <T extends ContractInterface<T> & AstroGoldTokenContract>() => {

  const spenderAddress = luckyCatGeoLotteryAdress.polygon as string
  const { walletAdress } = useWallet()

  const { viewAsyncState, withContract, createTransaction, ...contractSpec } = defineContract<T>('AstroGoldToken-contract', {
    contractAddress: astroGoldAdress.polygon as string,
    notifications: {
      failMessage: 'Error allowance Astro Gold Token'
    },
    createContract(provider) {
      return new ethers.Contract(astroGoldAdress.polygon as string, AstroGoldToken.abi, provider.getSigner()) as unknown as T
    }
  })


  const { execute: fetchAstroGold, data: astroGoldBalance, refresh: refreshAstroGoldBalance, pending: astroGoldPending } = viewAsyncState('astro-gold-balance', async (contract) => {
    const address = walletAdress.value
    if (!address)
      return 0

    const balance = await contract.balanceOf(address)
    return Number(ethers.utils.formatUnits(balance))
  })


  const allowance = (otherSpenderAddress: string = '') =>
    withContract((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

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

  const swapIXTtoAGOLD = (amount: number) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.upgrade(ethers.utils.parseUnits(amount.toString()))
    })

  const swapAGOLDtoIXT = (amount: number) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.downgrade(ethers.utils.parseUnits(amount.toString()))
    })

  return {
    ...contractSpec,
    allowance,
    approve,
    allowanceCheck,
    astroGoldPending,
    astroGoldBalance,
    fetchAstroGold,
    refreshAstroGoldBalance,

    swapIXTtoAGOLD,
    swapAGOLDtoIXT
  }
}
