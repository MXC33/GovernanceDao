<template lang="pug">
Popup()
  template(#content)
    HList(items="center" justify="between" p="4" b="b-1 ix-white opacity-60")
      WalletBalanceAgold(backModal="popup-type-one-time-entry" :parentBackModal="popup.backModal")

    VList(flex-grow="1" p="4" space-y="4" b="b-1 ix-white opacity-60" text="md" font="normal")
      p() Choose ticket amount
      VList(h="14")
        InputAdjustable(v-model="oneTimeLotteryEntries")
        p(text="sm right" color="ix-white opacity-60") {{oneTimeLotteryEntries.max}} entries out of {{maxOneTimeEntries}}

  template(#footer)
    HList(items="center" justify="between")
      span() Total ticket entries
      span() {{oneTimeLotteryEntries.value}}
    HList(items="center" justify="between" mt="2")
      span() Total price
      span() {{oneTimeLotteryEntries.value * ticketPrice}} AGOLD

    ButtonItem(:value="'pink'" w="full" mt="5" :text="'Purcahse'" @click="onPurchase()" :loading="isLoading")

</template>
<script lang="ts" setup>
import { useLottery } from "~/composables/useLottery";
import { useEnterLottery } from "~/composables/useEnterLottery";

const { maxOneTimeEntries } = useEnterLottery()
const { displayPopup, popup } = usePopups()

const {
  oneTimeLotteryEntries,
  enterLottery
} = useEnterLottery()

const { ticketPrice } = useLottery()

import { useContractRequest } from "~/composables/useContractRequest";
const { loading: isLoading, execute: oneTimeEntryRequest } = useContractRequest(() =>
  enterLottery(oneTimeLotteryEntries.value.value)
)

const onPurchase = async () => {
  const oneTimeEntry = await oneTimeEntryRequest()

  if (oneTimeEntry)
    displayPopup({
      type: 'popup-type-one-time-entry-success',
      entries: oneTimeLotteryEntries.value.value
    })
}

</script>
