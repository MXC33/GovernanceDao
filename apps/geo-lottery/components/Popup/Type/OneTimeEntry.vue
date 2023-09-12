<template lang="pug">
Popup()
  template(#content)
    HList(items="center" justify="between" p="4" b="b-1 ix-white opacity-60")
      WalletBalanceAgold()

    VList(flex-grow="1" p="4" space-y="4" b="b-1 ix-white opacity-60" text="md" font="normal")
      p() Choose ticket amount
      VList(h="14")
        InputAdjustable(v-model="oneTimeLotteryEntries")

  template(#footer)
    HList(items="center" justify="between")
      span() Total ticket entries
      span() {{oneTimeLotteryEntries.value}}
    HList(items="center" justify="between" mt="2")
      span() Total price
      span() {{oneTimeLotteryEntries.value * ticketPrice}} AGOLD

    ButtonItem(:value="'pink'" :text="'Purcahse'" @click="onPurchase()" :loading="isLoading")

</template>
<script lang="ts" setup>
import {useLottery} from "~/composables/useLottery";
import {useEnterLottery} from "~/composables/useEnterLottery";

const { walletState, isWalletConnected } = useWallet()
const { getEnteredTickets } = useLottery()

const {
  oneTimeLotteryEntries,
  enterLottery
} = useEnterLottery()

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
const { loading: isLoading, execute: oneTimeEntryRequest } = useContractRequest(() =>
  enterLottery(oneTimeLotteryEntries.value.value)
)

const onPurchase = async () => {
  const oneTimeEntry = await oneTimeEntryRequest()

  const { displayPopup } = usePopups()
  if (oneTimeEntry)
    displayPopup({
      type: 'popup-type-one-time-entry-success',
      entries: oneTimeLotteryEntries.value.value
    })
}

</script>
