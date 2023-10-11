<template lang="pug">
PopupBackground(@click="closeAd")
  VList(items="end" space-y="4" w="full" max-w="250" px="12")
    button(cursor="pointer" @click="closeAd" flex="~ row" space-x="3" opacity="hover:80" transition="opacity" items="center")
      div(color="white" translate-y="0.25") CLOSE AD
      div()
        CloseIcon(wh="3" fill="white")

    div(p="2" cursor="pointer" @click.stop="onClickAd" frame="")
      img(:src="desktopSrc" v-if="!isMobile")
      img(:src="mobileSrc"  v-else)

</template>

<script lang="ts" setup>
import CloseIcon from '~/assets/images/icons/close.svg'

const { isMobile } = useDevice()
const { showAdPopup, activeAd } = useAds()

const desktopSrc = computed(() => `/splash/${activeAd.value.id}/popup-desktop.jpg`)
const mobileSrc = computed(() => `/splash/${activeAd.value.id}/popup-mobile.jpg`)

const onClickAd = () => {
  return window.open(activeAd.value.url)
}

const closeAd = () => {
  showAdPopup.value = false
}
</script>