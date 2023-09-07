<template lang="pug">
VList(class="background-holder" pos="relative" overflow="hidden" z="0" min-h="600px" m="t-6 r-3 l-3 sm:t-10 sm:r-5 sm:l-5")
  Background( inset="0" object="cover center" pos="absolute" )
    template(#image-source)
      img(src="~/assets/images/cat-background.png" inset="0" object="cover" h="full" w="full" pos="absolute" z="-1")
  div(w="full" flex="~" justify="center" h="full" items-center pos="absolute")
    div(container mx-3 lg:px-10 xl:px-30 h="full" flex=" ~ col" justify="between" p="t-6 b-12 sm:t-8 sm:b-16")
      div()
        h3(color="$mc-pink" font="bdrA3mik" text="3xl center") TERRITORY LOTTERY
        h1(text="lg center" font="blender") OWN TERRITORIES | BUY TICKETS | WIN BIG
      div()
        p(font="bold" text="base sm:lg center" ) Every week, territories from around the world are randomly selected. <br> Join today and you will have the chance to win:
        h1(text="4xl md:7xl lg:8xl center" font="bdrA3mik") 2,050,080 IXT
      div(flex="~ col sm:row" justify="center" m="t-6" items-center)
        ButtonItem(:value="'pink'" :text="'JOIN NOW'"  min-w="300px md:255px" mb="3 sm:0" mr="0 sm:3" @click="openPurchaseTickets")
        ButtonItem(:value="'white'" :text="'SWAP ASTRO GOLD'" min-w="300px md:255px" @click="openSwap")
</template>

<script lang="ts" setup>
const { displayPopup } = usePopups()
const { checkIsAuth } = useHelperMethods()
const openPurchaseTickets = () => {
  if (!checkIsAuth()) return

  displayPopup({
    type: 'popup-type-purchase-tickets'
  })
}
const openSwap = () => {
  if (!checkIsAuth()) return

  displayPopup({
    type: 'popup-type-swap'
  })
}
</script>
