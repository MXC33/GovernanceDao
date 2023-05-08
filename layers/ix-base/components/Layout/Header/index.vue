<template lang="pug">
div(flex="~ col" pos="sticky top-0" z="99")
  div(flex="~ row" justify="between" items="center" w="full" bg="black" p="2" h="12" b="b-1 mc-orange_40 opacity-30")
    nuxt-link(to="https://www.planetix.com" h="full" flex="~ col grow")
      PlanetIX(max-w="40" w="full" h="full" translate-y="1")

    div(flex="~ row" space-x="3" items="center" justify="center")
      //- Language
      //- Language is only for test of .json files
      LayoutHeaderLink(to="/terminal" display="lt-md:none") {{ $t(`general.navigation.terminal`)}}
      LayoutHeaderLink(to="/" display="lt-md:none") {{ $t(`general.navigation.inventory`)}}
      LayoutHeaderLink(to="/mission-control" display="lt-md:none") 
        span(display="lt-lg:none") {{ $t(`general.navigation.missionCtrl`)}}
        span(display="lg:none") {{ $t(`general.mc`) }}

      LayoutHeaderLink(to="#" @click="gotoIXPage('game')" display="lt-md:none") {{ $t(`general.navigation.netEmpire`)}}
      GameHeaderResourcesIxt(type="ixt" display="lt-md:none" @click="openLifiWidget")
      UserHeaderProfileAvatar(text="xs" cursor="default" h="6" w="6" v-if="user")

      ButtonSound(sound="sm" opacity="50 on-enabled:100 hover:60" filter="grayscale on-enabled:none" transition="hover" @click="toggleSound" :enabled="isSoundEnabled")
        IconSoundOn(w="6" v-if="isSoundEnabled")
        IconSoundOff(w="6" v-else)


      ButtonSound(sound="sm" @click="toggleMenu" ml="!4")
        Hamburger(w="8" h="8" cursor="pointer" opacity="hover:50" transition="all")

    transition(name="fade")
      div(v-if="menuOpen" pos="fixed top-0 bottom-0 left-0 right-0" bg="black-800 opacity-20" backdrop="~ blur-md" @click="menuOpen = false" z="100" cursor="pointer")

    transition(name="slide-right")
      LayoutHeaderMenu(v-if="menuOpen")

</template>


<script lang="ts" setup>
const IconSoundOn = await import('../../../assets/images/sound/sound-on.svg')
const IconSoundOff = await import('../../../assets/images/sound/sound-off.svg')
const Hamburger = await import('../../../assets/images/header/hamburger.svg')
const PlanetIX = await import('../../../assets/images/header/planetix.svg')

const { gotoIXPage } = useIXLinks()
const { user } = useUser()
// const menuOpen = useSiteMenuOpen()
const { isSoundEnabled } = useSoundSettings()

const toggleSound = () => {
  isSoundEnabled.value = !isSoundEnabled.value
}

const toggleMenu = () => {
  // menuOpen.value = !menuOpen.value
}

</script>