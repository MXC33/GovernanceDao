<template lang="pug">
div()
  h2(mb-7 text="3xl md:4xl xl:5xl" font="bdrA3mik") THIS WEEK’S DRAW
  div(bg="black" rounded="4" b="1 $mc-pink" py-16)
    div(mb="18")
      p(text="xl center" font="extrabold" m="b-4 md:b-8" ) ROUND {{'#' + roundID}}
      HelperCountDown(:endTimestamp="endDate" :type="'large'")

    TierSize()

    div(flex="~" justify="center" font="bold" uppercase="~" text="base md:xl" m="y-6 md:y-10" flex-wrap)
      span YOUR ENTRIES:
      span(color="$mc-pink" m="x-1") {{enteredTickets.entered_tickets}}
      span() ONE-TIME TICKET &
      span(  color="$mc-pink" m="x-1") {{enteredTickets.entered_weekly_tickets || 0}}
      span() Subscription TICKETS
    div(flex="~ col md:row" justify="center" items-center )
      ButtonItem(:value="'pink'" mb="3 md:0" mr="0 md:3" min-w="300px md:265px" :text="'PURCHASE TICKETS'" @click="openPurchaseTickets")
      ButtonItem(:value="'white'" min-w="300px md:265px" :text="'MANAGE TICKETS'" @click="openManageTickets")
</template>

<script lang="ts" setup>
import {useLottery} from "~/composables/useLottery";
import {useLuckyCatGeoLotteryContract} from "~/composables/useLuckyCatGeoLotteryContract";

const { getEnteredTickets, enteredTickets } = useLottery()
const { walletState, isWalletConnected } = useWallet()
const { lotteryStartedAtDate } = useLottery()
const { lotteryID } = useLuckyCatGeoLotteryContract()

const endDate = ref<number>(new Date().getTime())
const roundID = ref<number>(0)

const loadChainInfo = async () => {
  const startDate = await lotteryStartedAtDate()
  endDate.value = startDate.setDate(startDate.getDate() + 7)
  roundID.value = Number(await lotteryID())
}


watch(walletState, (state) => {
  if (state != 'connected')
    return

  loadChainInfo()
  setTimeout(async () => {
    await getEnteredTickets()
  }, 1000)
}, { immediate: true })

const { displayPopup } = usePopups()
const { checkIsAuth } = useHelperMethods()

const openPurchaseTickets = () => {
  if (!checkIsAuth()) return

  displayPopup({
    type: 'popup-type-purchase-tickets'
  })
}

const openManageTickets = () => {
  if (!checkIsAuth()) return

  displayPopup({
    type: 'popup-type-manage-tickets'
  })
}
</script>
