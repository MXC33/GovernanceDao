<template lang="pug">
VList(pos="sticky top-0" z="99")
  HList(justify="between" items="center" w="full" bg="black" p="2" h="12" b="b-1 mc-orange_40 opacity-30")
    NuxtLink(to="https://www.planetix.com" h="full" flex="~ col grow")
      PlanetIX(max-w="40" w="full" h="full" translate-y="1")

    HList(space-x="3" items="center" justify="center")
      HeaderLink(to="/terminal" display="lt-md:none") {{ $t(`general.navigation.terminal`)}}
      HeaderLink(to="/" display="lt-md:none") {{ $t(`general.navigation.inventory`)}}
      HeaderLink(to="/mission-control" display="lt-md:none") 
        span(display="lt-lg:none") {{ $t(`general.navigation.missionCtrl`)}}
        span(display="lg:none") {{ $t(`general.mc`) }}

      HeaderLink(to="#" @click="gotoIXPage('game')" display="lt-md:none") {{ $t(`general.navigation.netEmpire`)}}
      //- GameHeaderResourcesIxt(type="ixt" display="lt-md:none" @click="openLifiWidget")
      //- UserHeaderProfileAvatar(text="xs" cursor="default" h="6" w="6" v-if="user")

      ButtonSound(sound="sm" opacity="50 on-enabled:100 hover:60" filter="grayscale on-enabled:none" transition="hover" @click="toggleSound" :enabled="isSoundEnabled")
        IconSoundOn(w="6" v-if="isSoundEnabled")
        IconSoundOff(w="6" v-else)


      ButtonSound(sound="sm" @click="toggleMenu" ml="!4")
        Hamburger(w="8" h="8" cursor="pointer" opacity="hover:50" transition="all")

    transition(name="fade")
      div(v-if="menuOpen" pos="fixed top-0 bottom-0 left-0 right-0" bg="black-800 opacity-20" backdrop="~ blur-md" @click="menuOpen = false" z="100" cursor="pointer")

    //- transition(name="slide-right")
    //-   LayoutHeaderMenu(v-if="menuOpen")

</template>


<script lang="ts" setup>
import IconSoundOn from '~/assets/images/sound/sound-on.svg'
import IconSoundOff from '~/assets/images/sound/sound-off.svg'
import Hamburger from '~/assets/images/header/hamburger.svg'
import PlanetIX from '~/assets/images/header/planetix.svg'

const { gotoIXPage } = useIXLinks()
const { user } = useUser()
const menuOpen = ref(false)
const { isSoundEnabled } = useSoundSettings()

const toggleSound = () => {
  isSoundEnabled.value = !isSoundEnabled.value
}

const toggleMenu = () => {
  // menuOpen.value = !menuOpen.value
}

</script>