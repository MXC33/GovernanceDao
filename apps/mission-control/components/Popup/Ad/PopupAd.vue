<template lang="pug">
PopupWrapper
  VList(items="center" space-y="4")
    HList(space-x="2" items="end" align="right" justify="end" w="70 md:40%")
      button( cursor="pointer" @click="closeAd" flex="~ row" space-x="3" opacity="hover:50")
        span(color="white") CLOSE AD
        closeBtn(w="5" h="5")

    IconFrameWithCorner(p="2" w="70% md:40%" cursor="pointer" @click="onClickAd")
      img(:src="adDesktop" v-if="!isMobile")
      img(:src="adMobile"  v-else)

</template>

<script lang="ts" setup>
import closeBtn from '~/assets/images/ui/ads/close-btn.svg'
import adMobile from '~/assets/images/ui/ads/ad-territorylottery-mobile.png'
import adDesktop from '~/assets/images/ui/ads/ad-territorylottery-desktop.png'

const { isMobile } = useDevice()

const { showAdPopup } = useAds()
const activePopup = usePopups()

const onClickAd = () => {
  const link = 'https://territorylottery.planetix.com'
  return window.location.href = link
}

const closeAd = () => {
  showAdPopup.value = false
  activePopup.value = null
}
</script>