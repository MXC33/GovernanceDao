<template lang="pug">
div(flex="~ row grow" items="center" justify="center" bg="#FF1E6E" pos="relative")
  HList(p="0 md:1" text="xs md:sm" w="full" v-if="isBannerActive")

    HList(flex-grow="1" font="bdrA3mik" items="center" justify="center" space-x="2"  tracking-wide )
      LuckyCatIcon(w="6 md:6" p="1")

      div(color="black") Territory Lottery
      div(color="white") is LIVE

      NuxtLink(to="https://territorylottery.planetix.com" )
        span.lucky-cat-text(uppercase="~" text="lt-md:center" p="lt-md:1") - Click Here

    HList(justify="end" items="center" pr="2" z="999")
      CloseIcon(w="2.5 md:4" fill="black hover:black" cursor="pointer" @click="toggleBanner")
</template>

<script lang="ts" setup>
import CloseIcon from '~/assets/images/icons/close.svg'
import LuckyCatIcon from '~/assets/images/splash/lucky-cat-golden.svg'


const { isBannerActive } = useAds()

const toggleBanner = () => {
  isBannerActive.value = false
}
</script>

<style>
.top-banner {
  background-image: radial-gradient(var(--mc-gray-600) 1px, transparent 0);
  background-size: 9px 9px;
}

.lucky-cat-text {
  background: linear-gradient(180deg, #FEDB3B 0%, #FEF7B5 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>