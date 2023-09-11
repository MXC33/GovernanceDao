<template lang="pug">
Popup(:hideCloseButton="true")
  template(#default)
    HList(items="center" justify="center" text="2xl" pt="6" font="bold" uppercase="~")
      h3() Congratulations!

    VList(flex-grow="1" items="center" justify="center" text="md center" font="normal" space-y="6")
      VList()
        p() {{ popup.entries }} ticket added successfully!
        p() Hope the luck be with you!
      VList()
        p() Winners will be drawn in:
        HelperCountDown(:endTimestamp="endDate")

  template(#footer)
    Button(:value="'pink'" w="full" @click="onClose") CLOSE

</template>
<script lang="ts" setup>

const { popup, closeActivePopup } = usePopups()
const { oneTimeLotteryEntries } = useEnterLottery()
const onClose = (() => {
  closeActivePopup()
})

import { useLottery } from "~/composables/useLottery";
const { lotteryStartedAtDate } = useLottery()
const startDate = await lotteryStartedAtDate()
const endDate = startDate.setDate(startDate.getDate() + 7)

onUnmounted(() => {
  oneTimeLotteryEntries.value.value = 1
})

</script>
