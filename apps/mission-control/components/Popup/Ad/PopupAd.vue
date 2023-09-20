<template lang="pug">
PopupWrapper()
  VList(items="center" space-y="4" min-h="0" justify="center" p="3")
    HList(space-x="2" items="end" align="right" justify="end" self="end")
      span(color="white") CLOSE AD
      closeBtn(w="5" h="5" cursor="pointer" @click="closeAd")

    VList(max-w="150" min-h="0" min-w="0" frame="~" items="center" p="3" )
      img(:src="adDesktop" v-if="!isMobile" max-h="full" max-w="full" min-w="0")
      img(:src="adMobile"  v-else  max-h="full" max-w="full" min-w="0" frame="~")

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