<template lang="pug">
div(flex="~ col md:row grow" items="center" justify="center" pos="relative" bg="gray-700"  p="2 md:1" text="xs md:sm" w="full"  h="full md:12" cursor="pointer" @click="onClickBanner")
  p(font="foundry 500" tracking-widest	text="center") LAST
  p(ml="1" font="foundry 500" color="$mc-pink " tracking-widest text="center"	) TERRITORY LOTTERY
  p(ml="1" font="foundry 500"  tracking-widest text="center") FOR THIS SEASON WILL BE DRAWN ON OCTOBER 31ST
  HList(justify="end" items="center" pr="2" z="999" fill="black hover:black" cursor="pointer" @click.stop="toggleBanner" opacity="hover:40" transition="opacity" pos="absolute right-1 md:right-6 top-50%" translate-y="-50%")
    ClientOnly()
      CloseIcon(w="2.5 md:3" fill="white")
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
