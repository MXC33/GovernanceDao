<template lang="pug">
VList(class="background-holder" pos="relative" overflow="hidden" z="0" min-h="600px" )
  Background( inset="0" object="cover center" pos="absolute" )
    template(#image-source)
      img(src="~/assets/images/cat-background.png" inset="0" object="cover" h="full" w="full" pos="absolute" z="-1")
  div(w="full" flex="~" justify="center" h="full" items-center pos="absolute")
    div(container mx-3 lg:px-10 xl:px-30 h="full" flex=" ~ col" justify="center" items-center p="t-14 b-14 sm:t-24 sm:b-24")
      h3( class="title-stroke " color="white" font="bdrA3mik" text="lg center stroke-$mc-pink" mb-5 v-if="livepage") OWN TERRITORIES | BUY TICKETS | WIN BIG
      div(mb-6 :max-w="livepage ? '350px' : '470px'")
        img(src="~/assets/images/LC-Territory-logot.png")
      h3( class="title-stroke " color="white" font="bdrA3mik" text="3xl center stroke-$mc-pink"  mb-4 v-if="!livepage") COMING SOON
      div(class="agold_title" w-full)
        h1(text="4xl md:5xl lg:6xl xl:7xl 2xl:8xl center" font="bdrA3mik" mb-2 v-if="livepage && activeRewards.rewards" flex="~ col md:row" justify="between"
          p-x="sm:5 md:23 lg:27 xl:21 2xl:17")
          span() {{rewardToDisplay}}
          span() AGOLD
        p(font="bold" text="base sm:lg center" mb-4 v-if="livepage") Every week, new Territories from around the world are <br> randomly selected. Join today and have the chance to win!
      div(flex="~ col sm:row" justify="center" m="t-6" items-center)
        template(v-if="livepage")
          ButtonItem(:value="'pink'" :text="'JOIN NOW'"  min-w="300px md:255px" mb="3 sm:0" mr="0 sm:3" @click="openPurchaseTickets" )
          ButtonItem(:value="'white'" :text="'SWAP ASTRO GOLD'" min-w="300px md:255px" @click="openSwap")
        ButtonItem( class="watch_teaser" :value="'pink'" :text="'WATCH TEASER'" h="15" min-w="300px"  @click="goToYoutubeLink" pos="relative" v-else)
</template>

<script lang="ts" setup>
import {useLottery} from "~/composables/useLottery";
const { isLotteryActive, getActiveRewards, activeRewards } = useLottery()
const { displayPopup } = usePopups()
const { checkIsAuth } = useHelperMethods()

const rewardToCounter = ref(0)
const rewardToDisplay = ref('0')
await getActiveRewards()
rewardToCounter.value = activeRewards.value.rewards

const activeRewardsInterval = setInterval(async () => {
  if(activeRewards.value.incomingFlowRate && activeRewards.value.incomingFlowRate > 0){
    rewardToCounter.value += (activeRewards.value.incomingFlowRate / 2) / 10
    rewardToDisplay.value = rewardToCounter.value.toFixed((3)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}, 100)

onUnmounted(() => {
  clearInterval(activeRewardsInterval)
})

const openPurchaseTickets = () => {
  if (!checkIsAuth()) return

  displayPopup({
    type: 'popup-type-purchase-tickets'
  })
}

const livepage = computed(() => {
  return isLotteryActive.value
})

const openSwap = () => {
  if (!checkIsAuth()) return

  displayPopup({
    type: 'popup-type-swap'
  })
}
const goToYoutubeLink = ( ) => {
  //return window.location.href = 'https://www.youtube.com/watch?v=nr8_gWSexg0&ab_channel=PLANETIX'
  return window.open('https://www.youtube.com/watch?v=nr8_gWSexg0&ab_channel=PLANETIX')
}
</script>
<style>
.title-stroke {
  /*-webkit-text-stroke: 1px #FF1E6E;*/
  -webkit-text-stroke-width: 1px;
}
/* to  be delated after Teaser */
.watch_teaser{
  position: relative;
  padding-left: 45px;
  padding-right: 25px;
  font-size: 21px;
}
.watch_teaser:after{
  position: absolute;
  left: 40px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  content: url("~/assets/icons/play-teaser.png");
  height: 25px;
  width: 25px;
}
/* END to  be delated after Teaser */

@media only screen and (min-width: 1536px) and (max-width: 1560px) {
  .agold_title h1{
    font-size: 95px;
    padding-left: 61px !important;
    padding-right: 61px !important;
  }
}
@media only screen and (min-width: 1280px) and (max-width: 1298px) {
  .agold_title h1{
    font-size: 70px;
  }
}
@media only screen and (min-width: 1024px) and (max-width: 1047px) {
  .agold_title h1{
    font-size: 58px;
  }
}
@media only screen and (min-width: 768px) and (max-width: 790px) {
  .agold_title h1{
    font-size: 47px;
    padding-left: 88px !important;
    padding-right: 88px !important;
  }
}
</style>
