<template lang="pug">
div.topBanner(
  v-if="topBannerData && topBannerData.id" flex="~ row grow" items="center" justify="center" pos="relative" p="0 md:1" text="xs md:sm" w="full"  h="12" cursor="pointer" @click="onClickBanner"
  :style="{ backgroundColor: topBannerData.background_color, backgroundImage: topBannerData.backgroundImage ? 'url(' + config.MEDIA_URL + '/' + topBannerData.backgroundImage.name +')': 'none'}"
  )

  HList(v-if="topBannerData.leftImage && topBannerData.leftImage.name" items="center" w="6 md:8" pos="absolute left-4 md:left-8 top-50%" translate-y="-50%" h="70%")
    img(:src="config.MEDIA_URL + '/' + topBannerData.leftImage.name" w="auto" max-h="full")

  HList(v-if="topBannerData.image && topBannerData.image.name" pos="absolute left-0 right-0" items="center" justify="center" mx="auto" top="50%" translate-y="-50%" object="contain" h="60%" max-w="70%")
    img(:src="config.MEDIA_URL + '/' + topBannerData.image.name" w="auto" max-h="full")

  HList(v-else-if="topBannerData.message" pos="absolute left-0 right-0" items="center" justify="center" mx="auto" top="50%" translate-y="-50%" object="contain" h="60%" max-w="70%")
    span(v-html="topBannerData.message" font="bold" text="base sm:lg center")

  HList(justify="end" items="center" z="999" fill="black hover:black" cursor="pointer" @click.stop="toggleBanner" opacity="hover:40" transition="opacity" pos="absolute right-4 md:right-8 top-50%" translate-y="-50%")
    CloseIcon(w="2.5 md:4" )
</template>

<script lang="ts" setup>
import CloseIcon from '~/assets/images/icons/close.svg'


const { topBannerAd, bannerAdActive, activeAd } = useAds()
const { data: topBannerData } = topBannerAd()
const config = useRuntimeConfig().public

const onClickBanner = () => {
  if (topBannerData.value?.link)
    return window.open(topBannerData.value.link)
}

const toggleBanner = () => {
  bannerAdActive.value = false
}
</script>

<style>
.topBanner {
  background-position: center center;
  background-attachment: inherit;
  background-size: cover;
  background-repeat: no-repeat;
}

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

@media only screen and (min-width: 1280px) {
  h2 {
    font-size: 1.875rem;
    line-height: 2.25rem;
    margin-top: -8px;

  }

  h3 {
    font-size: 1.5rem;
    line-height: 2rem;
    margin-top: -6px;
  }

  h4 {
    font-size: 1.25rem;
    line-height: 1.75rem;
    margin-top: -4px;
  }

  h5 {
    font-size: 1.125rem;
    line-height: 1.75rem;
    margin-top: -2px;
  }
}
</style>
