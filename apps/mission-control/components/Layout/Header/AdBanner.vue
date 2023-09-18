<template lang="pug">
div.top-banner(flex="~ row grow" w="full" items="center" justify="center" bg="mc-gray" pos="relative")
  HList(p="0 md:1" text="xs md:sm" w="full" v-if="isBannerActive")

    HList(flex-grow="1" font="bold" items="center" justify="center" space-x="2")
      Eterna(w="6 md:6" p="1")

      div(color="#f9f9f9") Gravity Grade Genesis Mint

      NuxtLink(to="https://planetix.com/mint/gravity-grade")
        span(color="mc-orange hover:mc-orange-40" uppercase="~" text="lt-md:center" p="lt-md:1") - Click Here

    HList(justify="end" items="center" pr="2" z="999")
      CloseIcon(w="2.5 md:4" fill="mc-orange hover:mc-orange_40" cursor="pointer" @click="toggleBanner")
</template>

<script lang="ts" setup>
import Eterna from '~/assets/images/ui/wallet/payments/ixt-logo-box.svg'
import CloseIcon from '~/assets/images/ui/close.svg'

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
</style>