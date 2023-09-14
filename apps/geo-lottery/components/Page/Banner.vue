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
      div()
        h1(text="4xl md:7xl lg:8xl center" font="bdrA3mik" mb-2 v-if="livepage") 2,050,080 IXT
        p(font="bold" text="base sm:lg center" mb-4 v-if="livepage") Every week, new Territories from around the world are <br> randomly selected. Join today and have the chance to win!
      div(flex="~ col sm:row" justify="center" m="t-6" items-center)
        ButtonItem(:value="'pink'" :text="'JOIN NOW'"  min-w="300px md:255px" mb="3 sm:0" mr="0 sm:3" @click="openPurchaseTickets" v-if="livepage")
        ButtonItem(:value="'white'" :text="'SWAP ASTRO GOLD'" min-w="300px md:255px" @click="openSwap" v-if="livepage")
        ButtonItem( class="watch_teaser" :value="'pink'" :text="'WATCH TEASER'" h="15" min-w="300px"  @click="openSwap" pos="relative" v-if="!livepage")
</template>

<script lang="ts" setup>
import PlayTeaser from '~/assets/icons/play-teaser.png'
const { displayPopup } = usePopups()
const { checkIsAuth } = useHelperMethods()
const openPurchaseTickets = () => {
  if (!checkIsAuth()) return

  displayPopup({
    type: 'popup-type-purchase-tickets'
  })
}

const livepage = ref(true)

const openSwap = () => {
  if (!checkIsAuth()) return

  displayPopup({
    type: 'popup-type-swap'
  })
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
</style>
