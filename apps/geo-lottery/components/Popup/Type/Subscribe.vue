<template lang="pug">
Popup()
  template(#content)
    HList(items="center" justify="between" p="4" b="b-1 ix-white opacity-60")
      WalletBalanceAgold(backModal="popup-type-subscribe" :parentBackModal="popup.backModal")

    VList(flex-grow="1" p="4" space-y="4" b="b-1 ix-white opacity-60" text="md" font="normal")
      p() Choose ticket amount
      VList(h="14")
        InputAdjustable(v-model="subscriptionEntries")

  template(#footer)
    HList(items="center" justify="between")
      span() Total ticket entries
      span() {{subscriptionEntries.value}}
    HList(items="center" justify="between" mt="2")
      span() Total price
      span() {{subscriptionEntries.value * ticketPrice}} AGOLD/WEEK

    ButtonItem(:value="'pink'" w="full" mt="5" :text="'Subscribe'" @click="onSubscribe()" :loading="isLoading")

</template>
<script lang="ts" setup>
import {useLottery} from "~/composables/useLottery";
import {useSubscription} from "~/composables/useSubscription";

const { walletState, isWalletConnected } = useWallet()
const { getEnteredTickets, enteredTickets } = useLottery()
const { displayPopup, popup } = usePopups()

const {
  subscriptionEntries,
  enterLotteryFlow,
  updateLotteryFlow
} = useSubscription()

const { ticketPrice, getTicketPrice } = useLottery()

const loadChainInfo = async () => {
  await getTicketPrice()
  await getEnteredTickets()
}

watch(walletState, async (state) => {
  if (state != 'connected')
    return

  await loadChainInfo()
})

onMounted(async () => {
  if (!isWalletConnected.value)
    return
  await loadChainInfo()
})

import { useContractRequest } from "~/composables/useContractRequest";
import {useLuckyCatGeoLotteryContract} from "~/composables/useLuckyCatGeoLotteryContract";

const { userFlowActive } = useLuckyCatGeoLotteryContract()
const { loading: isLoading, execute: subscriptionRequest } = useContractRequest(async () => {
  if (await userFlowActive())
    return updateLotteryFlow(subscriptionEntries.value.value)
  else
    return enterLotteryFlow(subscriptionEntries.value.value)
})

const onSubscribe = async () => {
  const subscription = await subscriptionRequest()

  if (subscription)
    displayPopup({
      type: 'popup-type-subscribe-success',
      entries: subscriptionEntries.value.value,
    })
}

</script>
