<template lang="pug">
PopupWrapper
  VList(items="center" space-y="4")
    HList(space-x="2" items="end" align="right" justify="end" w="70 md:30%")
      span(color="white") CLOSE AD
      closeBtn(w="5" h="5" cursor="pointer" @click="closeAd")
    IconFrameWithCorner(p="2" w="70% md:30%")
      img(:src="adDesktop" v-if="!isMobile")
      img(:src="adMobile"  v-else)

</template>

<script lang="ts" setup>
import closeBtn from '~~/assets/images/ui/ads/close-btn.svg'
import adMobile from '~~/assets/images/ui/ads/ad-mobile.png'
import adDesktop from '~~/assets/images/ui/ads/ad-desktop.png'

const isMobile = useMobileBreakpoint('md')

const { showAdPopup } = useAds()
const activePopup = usePopups()


const closeAd = () => {
  showAdPopup.value = false
  activePopup.value = null
}
</script>