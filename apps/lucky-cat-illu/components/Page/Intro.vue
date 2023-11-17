<template lang="pug">
PageWrapper(bg="black" page="start")
  img(src="~/assets/images/rocket.jpg" pos="image" opacity="50")
  VList(justify="center" flex-grow="1")
    div(grid="~ lg:cols-2" pos="relative" mt="12")
      VList(justify="center" items="center" order="lt-lg:1")
        LogoCoin(w="60%")
        PageButton(mt="6" whitespace-nowrap w="60%")
          a(:href="`#buy`" color="on-active:white" :active="'buy' == active") BUY $MILK

      VList(pos="relative" justify="center" items="center")
        img(:src="LogoIcon" w="60%" h="auto" pos="relative")

  PageBanner(pos="relative")
</template>

<script lang="ts" setup>
import LogoIcon from '~/assets/images/coin.gif'
import LogoCoin from '~/assets/images/lovemilk.svg'
const active = useLuckyPage()

</script>
