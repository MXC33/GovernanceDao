import { ethers } from "ethers";
import { enterLuckyCatRaffleAddress } from "../NFTs/walletAddresses";
import { ContractContext as PixCatRaffleContract } from '../ABIs/PIXCatRaffle'
import PixCatRaffleABI from '../ABIs/PIXCatRaffle.json'
import { CorporationRaffleItem } from "~/composables/corporations/useCorporationRaffle";
import { MaybeRef } from "@vueuse/core";
import { get } from '@vueuse/core'


export const useLuckyCatContracts = () => {
  const activeChain = useActiveChain()
  const luckyCatRaffleAddress = enterLuckyCatRaffleAddress[activeChain]
  const { approveContract } = usePayment()
  const { assetsContract } = useStakeNFTContracts()
  const { walletAdress } = useWallet()


  const { createTransaction, ...contractSpec } = defineContract<PixCatRaffleContract>('lucky-cat-contract', {
    contractAddress: luckyCatRaffleAddress,
    notifications: {
      sender: 'seina',
      failMessage: 'Nande desu! Something went wrong!'
    },
    createContract: (provider) =>
      new ethers.Contract(luckyCatRaffleAddress, PixCatRaffleABI.abi, provider.getSigner()) as unknown as PixCatRaffleContract
  })

  const enterRaffleFailed = async (msg?: string) => {
    const { addNotification } = useNotifications()

    if (msg)
      addNotification('Yabai! You’re unlucky and couldn’t enter the raffle-osu!', 'seina', msg)


    console.error("[Raffle] Enter Raffle Failed", msg)
    return false
  }

  const enteredRaffle = async () => {
    const { refresh: refreshRaffleData } = useLuckyCatRaffleData()
    const { refresh: refreshTickets } = useTokenData()
    const { addNotification } = useNotifications()

    await Promise.all([refreshRaffleData(), refreshTickets()])

    addNotification("You´ve entered the raffle-osu!", 'seina')
    return true
  }

  const claimedPrize = async () => {
    const { addNotification } = useNotifications()
    const { refresh: refreshRaffleData } = useLuckyCatRaffleData()
    const { refreshUserInventory } = useUserData()

    await Promise.all([refreshRaffleData(), refreshUserInventory()])

    addNotification("The meaning of luck is just to be alive, and your adventure has rewarded you!", 'seina')

    return true
  }


  const enterRaffle = async (raffleId: number, amount: number) =>
    createTransaction(async (contract) => {

      return await contract.enterRaffle(raffleId, amount)
    }, {
      approve: () => approveContract(assetsContract, luckyCatRaffleAddress),
      onSuccess: () => enteredRaffle(),
      onFail: () => enterRaffleFailed()
    })


  // Utility function to chunk an array
  const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };



  const claimPrize = async (raffleItem: CorporationRaffleItem) =>
    createTransaction(async (contract) => {

      const winnerIndex = raffleItem.winnings.findIndex(item => item.walletAddress == walletAdress.value)

      const prizeIds = raffleItem.winnings[winnerIndex].prizeIds

      console.log("Claim reward: RaffleId:", raffleItem.id, "prizeId:", prizeIds)
      if (prizeIds.length < 150)
        return await contract.claimRewards(raffleItem.id, prizeIds)


      // Chunk prizeIds into groups of 30 and call claimRewards for each
      const chunks = chunkArray(prizeIds, 150)
      for (const chunk of chunks) {
        console.log("Claim reward in chunks: RaffleId:", raffleItem.id, "chunk:", chunk)
        await contract.claimRewards(raffleItem.id, chunk)
      }
      return

    }, {
      onSuccess: () => claimedPrize()
    })



  return {
    enterRaffle,
    claimPrize,
    ...contractSpec,
  }
}

export const useLuckyCatRaffleData = () =>
  useAsyncState('raffle-info', async () => {
    const credentials = useGraphqlCredentials()
    const data = await GqlLuckyCatRaffle({ credentials })
    return {
      activeRaffles: data.luckyCatRaffleInfo.activeRaffles,
      pastRaffles: data.luckyCatRaffleInfo.pastRaffles,
      upcomingRaffles: data.luckyCatRaffleInfo.upcomingRaffles,
      myRaffles: data.luckyCatRaffleInfo.myRaffles
    }
  })


export const useLuckyCatRaffle = (raffleItem: MaybeRef<CorporationRaffleItem>) => {
  const { currentTime } = useGlobalTimestamp()

  const { balanceOfToken } = useUserData()

  const hasWonRaffle = computed(() =>
    get(raffleItem)?.isWinner
  )

  const hasClaimedRaffle = computed(() =>
    get(raffleItem)?.hasClaimed
  )

  const raffleIsActive = computed(() =>
    (get(raffleItem).dailyTickets.startTime + get(raffleItem).dailyTickets.duration) * 1000 > currentTime.value
  )

  const canClaimRaffle = computed(() =>
    hasWonRaffle.value && !hasClaimedRaffle.value
  )

  const ticketType = computed(() => get(raffleItem).dailyTickets.ticket.tokenInfo.tier)

  const raffleEntries = computed(() => get(raffleItem).totalEntries)

  const raffleIsFull = computed(() => get(raffleItem).totalEntries == get(raffleItem).dailyTickets.maxTotalEntries)

  const totalEntries = computed(() => get(raffleItem).dailyTickets.maxTotalEntries)

  const entriesLeft = computed(() => totalEntries.value - raffleEntries.value)

  const canEnterRaffle = computed(() => ticketBalanceForRaffle.value > 0 && get(raffleItem).entriesByWallet < get(raffleItem).dailyTickets.maxEntriesPerWallet && !raffleIsFull.value)

  const ticketBalanceForRaffle = computed(() => balanceOfToken(get(raffleItem)?.dailyTickets?.ticket) || null)



  return {
    hasWonRaffle,
    hasClaimedRaffle,
    raffleIsActive,
    canClaimRaffle,
    ticketType,
    raffleEntries,
    raffleIsFull,
    totalEntries,
    entriesLeft,
    canEnterRaffle,
    ticketBalanceForRaffle,
  }
}