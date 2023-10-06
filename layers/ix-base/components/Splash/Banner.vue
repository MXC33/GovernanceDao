<template lang="pug">
div(flex="~ row grow" items="center" justify="center" pos="relative" bg="#FF1E6E"  p="0 md:1" text="xs md:sm" w="full"  h="12" cursor="pointer" @click="onClickBanner")

  img(:src="imageSrc" flex-grow="1" pos="absolute" inset="0" object="cover" h="full" w="full")
  img(:src="contentSrc" pos="absolute left-0 right-0" mx="auto" top="50%" translate-y="-50%" object="contain" h="60%" max-w="70%")


  HList(justify="end" items="center" pr="2" z="999" fill="black hover:black" cursor="pointer" @click.stop="toggleBanner" opacity="hover:40" transition="opacity" pos="absolute right-6 top-50%" translate-y="-50%")
    ClientOnly()
      CloseIcon(w="2.5 md:4" )
</template>

<script lang="ts" setup>
import CloseIcon from '~/assets/images/icons/close.svg'


const { bannerAdActive, activeAd } = useAds()

const onClickBanner = () => {
  return window.open(activeAd.value.url)
}

const imageSrc = computed(() => `/splash/${activeAd.value.id}/background.png`)
const contentSrc = computed(() => `/splash/${activeAd.value.id}/content.png`)


const toggleBanner = () => {
  bannerAdActive.value = false
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