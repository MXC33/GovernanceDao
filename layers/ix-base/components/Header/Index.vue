<template lang="pug">
VList(pos="sticky top-0" z="99")
  HList(items="center" w="full" bg="gray-800" px="7.5" h="16" b="b-1 mc-orange_40 opacity-30")
    NuxtLink(to="https://www.planetix.com")
      PlanetIXNew(w="42.25")

    HList(space-x="8" px="8" items="center" font="bold" text="lg" flex-grow="1")
      HeaderLink(to="/terminal" display="lt-md:none") buy ixt
      HeaderLink(to="/" display="lt-md:none") play now
      HeaderLink(to="/" display="lt-md:none") staking
      HeaderLink(to="/" display="lt-md:none") community

    HList(font="bold" space-x="6" px="6")
      HeaderLink(to="/" display="lt-md:none") help
      HeaderLink(to="/" display="lt-md:none")
        HelperLanguage(language="EN")
    
    HList(items="center" h="10" b="1 $mc-mint" color="$mc-mint" font="bold" bg="$mc-mint-20" px="8") 2,234,128 IXT

      //- HeaderLink(to="/mission-control" display="lt-md:none") 
      //-   span(display="lt-lg:none") {{ $t(`general.navigation.missionCtrl`)}}
      //-   span(display="lg:none") {{ $t(`general.mc`) }}

      //- HeaderLink(to="#" @click="gotoIXPage('game')" display="lt-md:none") {{ $t(`general.navigation.netEmpire`)}}
      //- GameHeaderResourcesIxt(type="ixt" display="lt-md:none" @click="openLifiWidget")
      //- UserHeaderProfileAvatar(text="xs" cursor="default" h="6" w="6" v-if="user")
    //- HList(justify="end" w="full" flex-grow="1")
    //-   ButtonSound(sound="sm" opacity="50 on-enabled:100 hover:60" filter="grayscale on-enabled:none" transition="hover" @click="toggleSound" :enabled="isSoundEnabled")
    //-     IconSoundOn(w="6" v-if="isSoundEnabled")
    //-     IconSoundOff(w="6" v-else)


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
import PlanetIXNew from '~/assets/images/header/planetix-new.svg'



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