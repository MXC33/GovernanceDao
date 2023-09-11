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
        p(font="bold") {{days}} days {{hours}} hours {{minutes}} minutes {{seconds}} seconds

  template(#footer)
    Button(:value="'pink'" w="full" @click="onClose") CLOSE

</template>
<script lang="ts" setup>
import {useLottery} from "~/composables/useLottery";

const { popup, closeActivePopup } = usePopups()
const { oneTimeLotteryEntries } = useEnterLottery()
const onClose = (() => {
  oneTimeLotteryEntries.value.value = 1
  closeActivePopup()
})


const { lotteryStartedAtDate } = useLottery()

const days = ref<string>('00')
const hours = ref<string>('00')
const minutes = ref<string>('00')
const seconds = ref<string>('00')

let lotteryCountDownInterval: any;

const startLotteryCountDown = async () => {
  const startDate = await lotteryStartedAtDate()
  const endDate = startDate.setDate(startDate.getDate() + 7)
  lotteryCountDownInterval = setInterval(() => {
    const now = new Date()
    const diff = endDate - now.getTime()

    if(diff < 0) {
      days.value = '00'
      hours.value = '00'
      minutes.value = '00'
      seconds.value = '00'
    } else {
      days.value = Math.floor(diff / (1000 * 60 * 60 * 24)).toString()
      hours.value = ('0' + Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2)
      minutes.value = ('0' + Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).slice(-2)
      seconds.value = ('0' + Math.floor((diff % (1000 * 60)) / 1000)).slice(-2)
    }
  }, 1000)
}
const clearLotteryCountDown = () => {
  clearInterval(lotteryCountDownInterval)
  lotteryCountDownInterval = null
}

onMounted(async () => {
  await startLotteryCountDown()
})

onUnmounted(() => {
  clearLotteryCountDown()
})

</script>
