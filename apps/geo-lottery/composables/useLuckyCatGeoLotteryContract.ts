import { BigNumberish, ethers } from "ethers"
import { ContractInterface } from "@ix/base/composables/Utils/defineContract"
import { ContractContext as LuckyCatGeoLotteryContract } from '@ix/base/composables/Contract/Abis/LuckyCatGeoLottery'
import LuckyCatGeoLottery from '@ix/base/composables/Contract/Abis/LuckyCatGeoLottery.json'
import {
  astroGoldAdress,
  luckyCatGeoLotteryAdress,
  luckyCatGeoLotterySuperAppAdress
} from "@ix/base/composables/Contract/WalletAddresses";
import {useChainInfo} from "@ix/base/composables/Contract/useWallet";
import { Framework } from "@superfluid-finance/sdk-core";


export const useLuckyCatGeoLotteryContract = <T extends ContractInterface<T> & LuckyCatGeoLotteryContract>() => {

  const { walletAdress } = useWallet()

  const {
    withContract,
    createTransaction,
    ...contractSpec
  } = defineContract<T>('LuckyCatGeoLottery-contract', {
    contractAddress: luckyCatGeoLotteryAdress.polygon as string,
    notifications: {
      failMessage: 'Error allowance IXToken'
    },
    createContract(provider) {
      return new ethers.Contract(luckyCatGeoLotteryAdress.polygon as string, LuckyCatGeoLottery.abi, provider.getSigner()) as unknown as T
    }
  })

  /** Write **/

  const enterLottery = (entries: number) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.enterLottery(entries)
    })

  const calculateFlowRate = (amount: number) => {
    const weeklyAmountInSec = roundUp(amount / (3600 * 24 * 7), 16)
    return ethers.utils.parseUnits(weeklyAmountInSec.toString()).toString();
  }

  const initSuperApp = async () => {
    const { provider, getChain } = useWallet()

    if (!provider.value) {
      throw new Error("No provider found!")
    }

    const { chainIds } = useChainInfo()
    const chainId = chainIds[getChain('polygon')]
    const signer = provider.value?.getSigner();

    try {
      const sf = await Framework.create({
        chainId: Number(chainId),
        provider: provider.value
      });

      const superSigner = sf.createSigner({ signer: signer });
      const superToken = await sf.loadSuperToken(astroGoldAdress.polygon as string);

      return {
        superSigner: superSigner ?? null,
        superToken: superToken ?? null
      }
    } catch (e) {
      throw new Error("Something went wrong initializing Super App Stream Flow!")
    }
  }

  const enterLotteryFlow = async (amount: number) => {

    const {superSigner, superToken} = await initSuperApp()

    try {
      const createFlowOperation = superToken.createFlow({
        sender: await superSigner.getAddress(),
        receiver: luckyCatGeoLotterySuperAppAdress.polygon as string,
        flowRate: calculateFlowRate(amount)
        // userData?: string
      });

      return await createFlowOperation.exec(superSigner)
    } catch (error) {
      console.log(error)
      throw new Error("Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!")
    }
  }

  const removeLotteryFlow = async () => {

    const {superSigner, superToken} = await initSuperApp()

    try {
      const deleteFlowOperation = superToken.deleteFlow({
        sender: await superSigner.getAddress(),
        receiver: luckyCatGeoLotterySuperAppAdress.polygon as string
        // userData?: string
      });

      return await deleteFlowOperation.exec(superSigner)
    } catch (error) {
      console.error(error)
      throw new Error("Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!")
    }
  }

  const claimReward = (lotteryID: number, merkleProofs: string[][]) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      console.log('fisky lotteryID', lotteryID)
      console.log('fisky merkleProofs', merkleProofs)
      return contract.claimReward(lotteryID, merkleProofs)
    })

  /** END Write **/

  /** Read **/

  const lotteryID = () =>
    withContract((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.lotteryId()
    })

  const lotteryStartedAt = (lotteryID: number) =>
    withContract((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.lotteryStartedAt(lotteryID)
    })

  const territoryStaking = () =>
    withContract((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.territoryStaking()
    })

  const ticketPrice = () =>
    withContract((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.ticketPrice()
    })
  /** endRead **/

  return {
    ...contractSpec,
    /** Write **/
    enterLottery,
    enterLotteryFlow,
    removeLotteryFlow,
    claimReward,
    /** Read **/
    lotteryID,
    lotteryStartedAt,
    ticketPrice,
    territoryStaking
  }
}
