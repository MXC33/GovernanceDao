<template lang="pug">
ClientOnly
  CorporationItemsAndDetail(v-model="activeRaffleItem" :list="filterItems" detail-title="" v-if="!isComplete")
    template(#tabs)
      CorporationItemsAndDetailTab(v-for="tab in tabs" @click="onClickTab(tab)" :is-selected="activeTab(tab)") {{ tab }}

    template(#noItems)
      HelperWarning(bg="white opacity-10") {{noRafflesMessage}}

    template(#list)
      CorporationLuckyCatItem(v-for="item in filterItems" :item="item" :is-selected="isSelected(item)" @click="activeRaffleItem = item" :key="item.id" )

    template(#cartRight)
      VList(v-if="activeRaffleItem.state == 'active'")
        CorporationCartRow(uppercase="~" divide-x="0.5")
          CorporationCartColumn()
            template(#left) {{ $t(`corporations.lucky-cat.tickets.ticketType`) }}
            template(#right) {{ ticketType }}
          CorporationCartColumn()
            template(#left) {{ $t(`corporations.lucky-cat.tickets.entriesLeft`) }}
            template(#right) {{ entriesLeft }}

        CorporationCartRow()
          HelperAdjustable(v-model="adjustAmount" font="bold" text="sm" space-x="0")


          ButtonSound(grid="col-span-1" sound="sm" btn="~ accent-filled on-disable:disable" :disable="!canEnterRaffle" @click="onClickEnterRaffle(adjustAmount)" ) {{ enterCopy }}
      VList(v-else-if="activeRaffleItem.state == 'past' || activeRaffleItem.state == 'my'")
        div(grid="~ cols-2" b="b-1 $mc-accent")
          HList(grid="col-span-1"  justify="center" items="center" color="white on-winner:$mc-accent" :winner="hasWonRaffle" font="bold") {{  claimCopy }}
          ButtonSound(grid="col-span-1" sound="sm" btn="~ accent-filled on-disable:disable" :disable="!canClaimRaffle" @click="onClickClaimReward" ) {{ $t(`general.claim`) }}



    template(#buttonBack)  {{ $t(`general.exit`) }}
  CorporationComplete(v-else)
</template>

<script lang="ts" setup>
import type { CorporationRaffleItem } from '~~/composables/corporations/useCorporationRaffle';
import type { InfoBlockSlideshowHeader, InfoBlockTable } from '~~/composables/useInfoBlocks';
import type { AdjustableToken } from '~~/composables/useAdjustableNumber';
import type { NftFragment } from '#gql';
import type { CorporationPaymentToken } from '~~/composables/corporations/useCorporations';
import { format } from 'date-fns';

definePageMeta({
  middleware: 'auth',
  layout: 'corporation'
})

const adjustAmount = ref<AdjustableToken>(null)


const { activeRaffleItem, isComplete } = useCorporationRaffle()
const { execute: fetchRaffles, data: raffleData } = useLuckyCatRaffleData()
const { execute: fetchTokens } = useTokenData()
const { balanceOfToken } = useUserData()
const { hasWonRaffle, entriesLeft, canClaimRaffle, canEnterRaffle, ticketBalanceForRaffle, raffleIsFull, ticketType, } = useLuckyCatRaffle(activeRaffleItem)
const isMobile = useMobileBreakpoint()
const { walletAdress } = useWallet()



await Promise.all([fetchRaffles(), fetchTokens()])


const onClickEnterRaffle = async (paymentToken: CorporationPaymentToken) => {
  //enter raffle
  console.log("Entering Raffle with:", paymentToken.value, "of ", activeRaffleItem.value.dailyTickets.ticket.tokenId)
  const { enterRaffle } = useLuckyCatContracts()

  const didEnter = await enterRaffle(activeRaffleItem.value.id, paymentToken.value)
  if (didEnter)
    return refreshSelectedItem()
  return
}

const onClickClaimReward = async () => {
  //claim raffle
  const { claimPrize } = useLuckyCatContracts()

  const didClaim = await claimPrize(activeRaffleItem.value)
  if (didClaim)
    return refreshSelectedItem()
  return
}


const maxEntries = computed(() => activeRaffleItem.value?.dailyTickets?.maxEntriesPerWallet - activeRaffleItem.value?.entriesByWallet)

watch(maxEntries, (max) => {
  adjustAmount.value = {
    value: 1,
    min: 1,
    max,
    fromUser: true,
    token: {
      tokenInfo: {
        type: 'raffle-ticket'
      }
    }
  }
}, { immediate: true })

const isSelected = (item: CorporationRaffleItem) => activeRaffleItem.value?.id == item.id && activeRaffleItem.value.dailyTickets.startTime == item.dailyTickets.startTime


const allRaffles = computed<CorporationRaffleItem[]>(() => {
  const { activeRaffles, pastRaffles, upcomingRaffles, myRaffles } = raffleData.value

  const active = activeRaffles.map(item => ({ ...item, state: 'active' })).reverse()
  const past = pastRaffles.map(item => ({ ...item, state: 'past' })).reverse()
  const upcoming = upcomingRaffles.map(item => ({ ...item, state: 'upcoming' }))
  const my = myRaffles.map(item => ({ ...item, state: 'my' })).reverse()


  return [...active, ...past, ...upcoming, ...my] as CorporationRaffleItem[]

})

const availableItems = computed(() => allRaffles.value?.map(addInfoBlock) ?? [])

const selectedStatus = ref('active')

const selectedStatusToTabs = (tab: Tab) => {
  switch (tab) {
    case 'live raffles': return 'active'
    case 'my entries': return 'my'
    case 'upcoming': return 'upcoming'
    case 'history': return 'past'

  }
}

type Tab = 'live raffles' | 'my entries' | 'upcoming' | 'history'
const tabs: Tab[] = ['live raffles', 'my entries', 'upcoming', 'history']

const onClickTab = (tab: Tab) => {
  selectedStatus.value = selectedStatusToTabs(tab)
  activeRaffleItem.value = filterItems.value[0]
}

const refreshSelectedItem = () => {
  const selectedId = activeRaffleItem.value?.id
  activeRaffleItem.value = filterItems.value.find((raffle) => raffle.id == selectedId)
}

const activeTab = (tab: Tab) => selectedStatus.value == selectedStatusToTabs(tab)


const filterItems = computed(() => availableItems.value?.filter(item => item.state == selectedStatus.value) ?? [])


const noRafflesMessage = computed(() => {
  switch (selectedStatus.value) {
    case 'active': return "NO ACTIVE RAFFLES"
    case 'past': return "NO PAST RAFFLES"
    case 'upcoming': return "NO UPCOMING RAFFLES"
    default: return "NO ACTIVE RAFFLES"
  }
})

const clickViewLandmark = async (token: NftFragment) => {
  const { execute: fetchTokenInfodata, data } = useTokenInfo(token.tokenId, token.contract)
  await fetchTokenInfodata()

  const landmarkURL = data.value.external_url
  const newLandmarkURL = landmarkURL.replace("/game/", "/netempire/");

  if (isMobile.value) {
    window.location.assign(newLandmarkURL)
  } else {
    window.open(newLandmarkURL)
  }
}


const claimCopy = computed(() => {
  if (hasWonRaffle.value)
    return "YOU WON"
  else return "NO LUCK"
})

const enterCopy = computed(() => {
  if (raffleIsFull.value)
    return "RAFFLE IS FULL"
  else return "ENTER RAFFLE"
})

const getRaffleDetails = (raffle: CorporationRaffleItem) => {
  const hasEntries = raffle.totalEntries != null
  return [{
    items: [
      {
        name: 'No. Winning Tickets',
        value: raffle.prize.totalPrizes.toString()
      }, {
        name: 'No. Entries',
        value: hasEntries ? raffle.totalEntries?.toString() + '/' + raffle.dailyTickets.maxTotalEntries.toString() : '0/' + raffle.dailyTickets.maxTotalEntries.toString()
      }, {
        name: 'Start Date',
        value: getTime(raffle.dailyTickets.startTime * 1000)
      }, {
        name: 'End Date',
        value: getTime(raffle.dailyTickets.startTime * 1000 + raffle.dailyTickets.duration * 1000)
      }, {
        name: 'Ticket Type',
        value: raffle.dailyTickets.ticket.tokenInfo.tier
      }, {
        name: 'Entries Per Wallet',
        value: raffle.dailyTickets.maxEntriesPerWallet.toString()
      }]
  }]
}

const getTime = (date: number) =>
  format(date, 'dd.MM.yyyy / HH:mm')



const addInfoBlock = (token: CorporationRaffleItem): CorporationRaffleItem => {

  const getWinnerInfo = (): InfoBlockTable | null => {
    if (!token.winnings) {
      return {
        blockType: 'table',
        items: [{
          name: '',
          value: 'TBD',
          state: 'active',
          oneColumn: true
        }]
      }
    } else {
      return {
        blockType: 'table',

        items: token.winnings.sort((a, b) => {
          if (hasWonRaffle) {
            if (a.walletAddress === walletAdress.value) return -1
            if (b.walletAddress === walletAdress.value) return 1
          }
          return b.amount - a.amount
        }).map(winner => ({
          name: winner.walletAddress == walletAdress.value ? 'YOU' : minimizeString(winner.walletAddress),
          value: `${winner.amount} Winning Tickets / ${winner.enteredWith} Entries`,
          state: 'active'
        }))
      }
    }
  }

  const getMetaInfo = (token: CorporationRaffleItem): InfoBlockTable | null => {

    return {
      blockType: 'table',
      items: token.prize.items.map(item => ({
        name: item.token.tokenInfo.title,
        value: item.amount.toString(),
        state: 'active'
      }))
    }
  }

  const getSlideShowHeader = (token: CorporationRaffleItem): InfoBlockSlideshowHeader => {

    const tokens: NftFragment[] = token.prize.items.map(item => item.token)
    const hasLandmarkAsPrize = tokens.some(item => item.tokenInfo.type == 'landmark')

    const ticketBalance = balanceOfToken(token.dailyTickets.ticket).toString()
    if (token.state == 'active') {
      return {
        blockType: 'slideshowHeader',
        title: "Raffle #" + token.id,
        items: [{
          name: 'Time Left: ',
          valueType: 'timeLeft',
          endTime: (token.dailyTickets.startTime + token.dailyTickets.duration) * 1000,
          oneColumn: true
        }, {
          name: 'My Entries',
          value: token.entriesByWallet.toString() + '/' + token.dailyTickets.maxEntriesPerWallet.toString()
        }, {
          name: 'Ticket Type',
          value: token.dailyTickets.ticket.tokenInfo.tier
        }, {
          name: 'My Ticket Balance',
          value: ticketBalance
        }],
        slideShowItems: tokens,
        button: {
          text: "Landmark Inspector",
          hidden: !hasLandmarkAsPrize,
          onClick: async () => {
            await clickViewLandmark(tokens[0])
          },
        },
      }
    } else if (token.state == 'past' || token.state == 'my') {
      return {
        blockType: 'slideshowHeader',
        title: "Raffle #" + token.id,
        items: [{
          name: 'No. Winning Tickets',
          value: token.prize.totalPrizes.toString()
        }, {
          name: 'My Entries',
          value: token.entriesByWallet.toString() + '/' + token.dailyTickets.maxEntriesPerWallet.toString()
        }, {
          name: 'Ticket Type',
          value: token.dailyTickets.ticket.tokenInfo.tier
        }, {
          name: 'My Ticket Balance',
          value: ticketBalance
        }],
        slideShowItems: tokens,
        button: {
          text: "Landmark Inspector",
          hidden: !hasLandmarkAsPrize,
          onClick: async () => {
            await clickViewLandmark(tokens[0])
          },
        },
      }
    } else if (token.state == 'upcoming') {
      return {
        blockType: 'slideshowHeader',
        title: "Raffle #" + token.id,
        items: [{
          name: 'Countdown: ',
          valueType: 'timeLeft',
          endTime: (token.dailyTickets.startTime * 1000),
          oneColumn: true
        }, {
          name: 'Ticket Type',
          value: token.dailyTickets.ticket.tokenInfo.tier
        }, {
          name: 'My Ticket Balance',
          value: ticketBalance.toString()
        }],
        slideShowItems: tokens,
        button: {
          text: "Landmark Inspector",
          hidden: !hasLandmarkAsPrize,
          onClick: async () => {
            await clickViewLandmark(tokens[0])
          },
        },
      }
    }
  }

  return {

    ...token,
    infoBlocks: [
      getSlideShowHeader(token)
      ,
      {
        blockType: 'description',
        title: "Prizes",
        metaInfo: getMetaInfo(token),
      },
      {
        blockType: 'details',
        title: 'Raffle Details',
        sections: getRaffleDetails(token)
      },
      {
        blockType: 'description',
        title: 'Winners',
        metaInfo: getWinnerInfo()
      },

    ]

  }
}

</script>