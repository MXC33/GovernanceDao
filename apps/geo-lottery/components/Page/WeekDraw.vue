<template lang="pug">
div()
  h2(mb-7 text="3xl md:4xl xl:5xl" font="bdrA3mik") THIS WEEK’S DRAW
  div(bg="black" rounded="4" b="1 $mc-pink" py-16)
    div(mb="18")
      p(text="xl center" font="extrabold" m="b-4 md:b-8" ) ROUND #031
      HelperCountDown(:endTimestamp="1694776976000" :type="'large'")

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

const { getEnteredTickets, enteredTickets } = useLottery()
const { walletState, isWalletConnected } = useWallet()

const loadChainInfo = async () => {
  await getEnteredTickets()
}

watch(walletState, async (state) => {
  if (state != 'connected')
    return

  await loadChainInfo()
})

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
