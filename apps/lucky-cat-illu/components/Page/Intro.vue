<template lang="pug">
PageWrapper(bg="black" page="start")
  VList(flex-grow="1" justify="center")
    img(src="~/assets/images/rocket.jpg" pos="image" opacity="50")
    div(grid="~ lg:cols-2 lg:gap-0 gap-12" pos="relative" mt="12" flex-grow="1")
      VList(justify="center" items="center" order="lt-lg:1")

        Spacer()

        LogoCoin(w="60%")
        PageButton(mt="6" whitespace-nowrap w="60%" @click="navigateTo('#buy', {external:true})") BUY $MILK

        Spacer()

        Links()

      VList(pos="relative" justify="center" items="center")
        img(:src="LogoIcon" w="60%" h="auto" pos="relative")

  PageBanner(pos="relative")
</template>

<script lang="ts" setup>
import LogoIcon from '~/assets/images/coin.gif'
import LogoCoin from '~/assets/images/lovemilk.svg'
const active = useLuckyPage()

</script>
