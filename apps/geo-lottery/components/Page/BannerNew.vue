<template lang="pug">
VList(class="banner" pos="relative" overflow="hidden" z="0" min-h="650px sm:1000px")
  Background( inset="0" object="cover center" pos="absolute" )
    template(#image-source)
      img(src="~/assets/images/banner-map.png" inset="0" object="cover" h="full" w="full" pos="absolute" z="-1" opacity="50")
  div(w="full" flex="~" justify="center" h="full" items-center pos="absolute")
    div(w="full" flex="~" justify="center" top="0" pos="absolute" v-if="isLoggedInAndConnected" )
    div(container mx-3 lg:px-10 xl:px-30 h="full" flex=" ~ col" justify="center" items-center p="t-25 b-1 sm:t-24 sm:b-28")
      div(bg="gray-700" w="350px sm:590px" min-h="500px sm:760px" p="b-6 sm:b-10 l-6 sm:l-10 r-6 sm:r-10" pos="relative")
        div(w="full" items="center" justify="center" flex="~" pos="absolute" top="-50px" left="0")
          img(src="/TL_Logo.svg")
        h2( font="bdrA3mik" text="base sm:5xl" mt="18 sm:24" mb="6") Dear AOC,
        p(font="foundry bold" text="base sm:xl" mb="4") LOTTERY IS SHUT DOWN
        p(font="foundry" text="base sm:xl" mb="5") Our heartfelt thanks for being part of our Territory Lottery BETA testing. The testing phase has concluded, and we've been fortunate to gather invaluable insights and feedback from our vibrant community throughout the six Beta rounds.
        p(font="foundry" text="base sm:xl") As we temporarily shift our focus towards future projects, a round of applause is due for the Lucky Winners!
</template>

<script lang="ts" setup>
import { format } from "date-fns"
import { useLottery } from "~/composables/useLottery";
const { isLotteryActive, activeRewards, enteredTickets } = useLottery()
const { displayPopup } = usePopups()
const { checkIsAuth } = useHelperMethods()
const { isLoggedInAndConnected } = useLogin()

const currentReward = ref(0)
const rewardToDisplay = ref('0')

watch(activeRewards, () => {
  currentReward.value = activeRewards.value.rewards - 5000
}, { immediate: true })

const activeRewardsInterval = setInterval(async () => {
  if (currentReward.value > 0 && activeRewards.value.incomingFlowRate && activeRewards.value.incomingFlowRate > 0) {
    if (currentReward.value < activeRewards.value.rewards) {
      currentReward.value += Number(5000 / 180)
    }
    else {
      currentReward.value += (activeRewards.value.incomingFlowRate / 2) / 5
    }
    rewardToDisplay.value = currentReward.value.toFixed((3)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

}, 200)

const topInfo = computed(() => {
  let totalTickets = 0
  if (enteredTickets.value)
    totalTickets = enteredTickets.value.entered_tickets + enteredTickets.value.entered_stream

  let nextTicketPercentage = 0
  if (enteredTickets.value && enteredTickets.value.next_ticket_percentage)
    nextTicketPercentage = enteredTickets.value.next_ticket_percentage

  let fundsLastUntil = ''
  if (enteredTickets.value && enteredTickets.value.funds_last_until && enteredTickets.value.funds_last_until.getTime() > new Date().getTime())
    fundsLastUntil = format(enteredTickets.value.funds_last_until, 'dd-MM-yyyy')

  return {
    totalTickets,
    nextTicketPercentage,
    fundsLastUntil
  }
})

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
const goToYoutubeLink = () => {
  //return window.location.href = 'https://www.youtube.com/watch?v=nr8_gWSexg0&ab_channel=PLANETIX'
  return window.open('https://www.youtube.com/watch?v=nr8_gWSexg0&ab_channel=PLANETIX')
}


</script>
<style>
.banner {
  background: linear-gradient(180deg, #FF1E6E 0%, rgba(34, 18, 24, 0) 100%);
}

.banner-top {
  background-image:
    linear-gradient(to left bottom, #000 0 50%, transparent 50% 100%),
    linear-gradient(to right bottom, #000 0 50%, transparent 50% 100%),
    linear-gradient(#000 0 100%);
  background-size:
    40px 100%, 40px 100%, calc(100% - 80px) 100%;
  background-position:
    left top, right top, center top;
  background-repeat: no-repeat;

}

@media only screen and (min-width: 0px) and (max-width: 460px) {
  .banner-top {
    background: transparent;
  }
}

.title-stroke {
  /*-webkit-text-stroke: 1px #FF1E6E;*/
  -webkit-text-stroke-width: 1px;
}

.banner-title {
  /*background: linear-gradient(#F9F9F9, #FF1E6E);*/
  background: #F9F9F9;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-stroke: 3px #FF1E6E;
  -webkit-text-stroke: 3px #FF1E6E;
}

/* to  be delated after Teaser */
.watch_teaser {
  position: relative;
  padding-left: 45px;
  padding-right: 25px;
  font-size: 21px;
}

.watch_teaser:after {
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
  .agold_title h1 {
    font-size: 95px;
    padding-left: 61px !important;
    padding-right: 61px !important;
  }
}

@media only screen and (min-width: 1280px) and (max-width: 1298px) {
  .agold_title h1 {
    font-size: 70px;
  }
}

@media only screen and (min-width: 1024px) and (max-width: 1047px) {
  .agold_title h1 {
    font-size: 58px;
  }
}

@media only screen and (min-width: 768px) and (max-width: 790px) {
  .agold_title h1 {
    font-size: 47px;
    padding-left: 88px !important;
    padding-right: 88px !important;
  }
}
</style>
