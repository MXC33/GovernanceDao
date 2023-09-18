<template lang="pug">
div(flex="~ col" pos="sticky top-0" z="99")
  LayoutHeaderAdBanner()

  div(flex="~ row" justify="between" items="center" w="full" bg="black" p="2" h="12" b="b-1 mc-orange_40 opacity-30")
    nuxt-link(to="https://www.planetix.com" h="full" flex="~ col grow")
      PlanetIX(max-w="40" w="full" h="full" translate-y="1")

    HList(space-x="3" items="center" justify="center")
      //- Language
      //- Language is only for test of .json files
      HList(space-x="3" items="center" justify="center" display="lt-lg:none")
        LayoutHeaderLink(to="/terminal") {{ $t(`general.navigation.terminal`)}}
        LayoutHeaderLink(to="/") {{ $t(`general.navigation.inventory`)}}
        LayoutHeaderLink(to="/mission-control") 
          span(display="lt-xl:none") {{ $t(`general.navigation.missionCtrl`)}}
          span(display="xl:none") {{ $t(`general.mc`) }}

        LayoutHeaderLink(to="#" @click="gotoIXPage('game')") {{ $t(`general.navigation.netEmpire`)}}
        LayoutHeaderLink(to="#" @click="gotoIXPage('marketplace')") {{ $t(`general.navigation.marketPlace`)}}
        LayoutHeaderSpecialButton(to="#" @click="gotoIXPage('airdrop')") {{ $t(`general.navigation.airdrop`)}}

      GameHeaderResourcesIxt(type="ixt" @click="openLifiWidget")
      UserHeaderProfileAvatar(text="xs" cursor="default" h="6" w="6" v-if="user")

      Notification()

      ButtonSound(sound="sm" opacity="50 on-enabled:100 hover:60" filter="grayscale on-enabled:none" transition="hover" @click="toggleSound" :enabled="isSoundEnabled")
        IconSoundOn(w="6" v-if="isSoundEnabled")
        IconSoundOff(w="6" v-else)

      ButtonSound(sound="sm" @click="toggleMenu" ml="!4")
        Hamburger(v-if="!menuOpen" w="8" h="8" cursor="pointer" opacity="hover:50" transition="all")
        Cross(v-else w="8" h="8" cursor="pointer" opacity="hover:50" transition="all")

    transition(name="fade")
      div(v-if="menuOpen" pos="fixed top-12 bottom-0 left-0 right-0 s-adBannerDesktop:top-22 s-adBannerMobil:top-18" bg="black-800 opacity-20" backdrop="~ blur-md" @click="menuOpen = false" z="100" cursor="pointer" :state="getBannerStatues")

    transition(name="slide-right")
      Header(v-if="menuOpen")

    LayoutHeaderLifiWidget(v-if="state" @click="disable()")

</template>


<script lang="ts" setup>
import IconSoundOn from '~/assets/images/ui/icon-sound-on.svg'
import IconSoundOff from '~/assets/images/ui/icon-sound-off.svg'
import Settings from '~/assets/images/ui/settings.svg'

import Hamburger from '~/assets/images/ui/hamburger.svg'
import Cross from '~/assets/images/ui/cross.svg'
import PlanetIX from '~/assets/images/terminal/planetix.svg'

const { gotoIXPage } = useIXLinks()
const isMobile = useMobileBreakpoint('lg')
const { user } = useUser()
const menuOpen = useSiteMenuOpen()
const settingsOpen = useSiteSettings()
const { isSoundEnabled } = useSoundSettings()
const gameMenu = useGameMenu()

const toggleSound = () => {
  isSoundEnabled.value = !isSoundEnabled.value
}

const toggleSettings = () => {
  if (settingsOpen.value) {
    settingsOpen.value = false
    if (isMobile.value)
      gameMenu.value = null
  } else {
    settingsOpen.value = true
    if (isMobile.value) {
      console.log("inside toggle settings else")
      gameMenu.value = null
      gameMenu.value = 'mc-settings'
    }
    else
      gameMenu.value = null
  }
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const { state, disable, enable } = useIXTSwapVisible()
const bannerDisabled = ref(false)

const openLifiWidget = () => enable()
const clickCancel = () => disable()

const { isBannerActive } = useAds()
const getBannerStatues = computed(() => {
  if (isBannerActive.value && !isMobile.value)
    return 'adBannerDesktop'
  if (isBannerActive.value && isMobile.value)
    return 'adBannerMobil'

  return ''
})

</script>
