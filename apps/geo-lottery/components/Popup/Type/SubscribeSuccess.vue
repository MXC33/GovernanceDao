<template lang="pug">
Popup()
  template(#default)
    HList(items="center" justify="center" text="2xl" pt="6" font="bold" uppercase="~")
      h3() Congratulations!

    VList(flex-grow="1" items="center" justify="center" text="md center" font="normal" space-y="6")
      VList()
        p() Subscription activated and {{ popup.entries }} ticket added!
        p() Hope the luck be with you!
      VList()
        p() Winners will be drawn in:
        HelperCountDown(:endTimestamp="endDate")

  template(#footer)
    Button(:value="'pink'" w="full" @click="onClose") CLOSE

</template>
<script lang="ts" setup>

const { popup, closeActivePopup } = usePopups()
const { subscriptionEntries } = useSubscription()
const onClose = (() => {
  closeActivePopup()
})

import { useLottery } from "~/composables/useLottery";
const { lotteryStartedAtDate } = useLottery()
const startDate = await lotteryStartedAtDate()
const endDate = startDate.setDate(startDate.getDate() + 7)

onUnmounted(() => {
  subscriptionEntries.value.value = 1
})
</script>
