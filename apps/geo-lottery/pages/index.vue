<template lang="pug">
div(class="body-main")
  PageBanner(:livepage="true")
  VList(class="background-holder"  pos="relative" overflow="hidden" z="0")
    Background()
      template(#image-source)
        img(src="~/assets/images/points.png" inset="0"  z="-1" object="contain top" h="auto" w="full" pos="absolute")
    div(w="full" flex="~" justify="center")
      div(container mx-3 lg:px-10 xl:px-30 space-y-14 md:space-y-18 lg:space-y-32 m="y-14 sm:y-22 md:y-32")
        //How to Play Section
        PageInfo()
        PageWeekDraw(v-if="isLotteryActive && !weeksDraw.last_drawn_lottery")
        PageWeekDrawWinners(v-if="weeksDraw.last_drawn_lottery && weeksDraw.last_drawn_lottery.id")
        //The Jackpot
        PageJackpot()

        PageRounds(v-if="isLotteryActive && weeksDraw.rounds && weeksDraw.rounds.length")

        //Prize Check
        PagePrizeCheck()
        //Price & Pool Distribution
        PageDistribution()


</template>
<script lang="ts" setup>
import {useLottery} from "~/composables/useLottery";

const {isLotteryActive, checkLotteryActive} = useLottery()
const { weeksDraw } = useLottery()

const lotteryActiveInterval = setInterval(() => {
  checkLotteryActive()
  if (isLotteryActive.value)
    clearInterval(lotteryActiveInterval)
}, 1000)

useHead({
  title: "Home | Geo Lottery | PlanetIX"
})

import Background from "~/components/Background.vue";

</script>
<style>
.body-main{
  background-image: linear-gradient(#1f1016, #580623);
}
</style>
