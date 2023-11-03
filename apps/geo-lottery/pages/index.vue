<template lang="pug">
div(class="body-main")
  PageBannerNew(:livepage="true")
  VList(pos="relative" overflow="hidden" z="0")
    //Background()
      template(#image-source)
        img(src="~/assets/images/points.png" inset="0"  z="-1" object="contain top" h="auto" w="full" pos="absolute")
    div(w="full" flex="~" justify="center")
      div(container mx-3 lg:px-10 xl:px-30 space-y-14 md:space-y-18 lg:space-y-32 m="y-14 sm:y-22 md:y-32")
        //How to Play Section
        PageInfo()
        PageWeekDraw(v-show="isLotteryActive && (!weeksDraw.last_drawn_lottery || !weeksDraw.last_drawn_lottery.country_code)")
        PageWeekDrawWinners(v-show="weeksDraw.last_drawn_lottery && weeksDraw.last_drawn_lottery.country_code")
        //The Jackpot
        PageJackpot()

        PageRounds(v-if="isLotteryActive && weeksDraw.rounds && weeksDraw.rounds.length")

        //Prize Check
        PagePrizeCheck()
        //Price & Pool Distribution
        PageDistribution()


</template>
<script lang="ts" setup>
import { useLottery } from "~/composables/useLottery";

const { isLotteryActive } = useLottery()
const { weeksDraw } = useLottery()

useHead({
  title: "Home | Territory Lottery | PlanetIX"
})

import Background from "~/components/Background.vue";

</script>
<style>
.body-main {
  /*background-image: linear-gradient(#1f1016, #580623);*/
  background: linear-gradient(180deg, #211217 21.29%, #580724 96.08%);
}
</style>
