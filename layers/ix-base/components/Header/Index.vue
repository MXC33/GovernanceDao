<template lang="pug">
VList(pos="sticky top-0" z="99" w="full")
  HList(items="center"  bg="gray-800" px="7.5" h="16")
    NuxtLink(to="https://www.planetix.com")
      PlanetIXNew(w="42.25")

    HList(space-x="8" px="8" items="center" font="bold" text="lg" flex-grow="1")
      HeaderLink(v-for="(item, index) in siteTopHeaders" @click="OpenMeny(index)") {{ $t(`marketplace.headers.${item.type}.title`)}}
      //- HeaderLink(to="/" display="lt-md:none") buy ixt
      //- HeaderLink(to="/" display="lt-md:none") play now
      //- HeaderLink(to="/" display="lt-md:none") staking
      //- HeaderLink(to="/" display="lt-md:none") community

    HList(font="bold" space-x="6" px="6")
      HeaderLink(to="/" display="lt-md:none") help
      HeaderLink(to="/" display="lt-md:none")
        HelperLanguage(language="EN")

    VList(items="center" pos="relative")
      HList(h="10" b="1 $mc-mint" color="$mc-mint" font="bold" bg="$mc-mint-20" px="8" display="lt-md:none" @click="toggleMenu" items="center" ) 2,234,128 IXT
      VList(v-if="menuOpen" @click="toggleMenu" pos="absolute top-full left-0 right-0" b="1 gray-400" items="left") 
        div(v-for="subHeader in settingArr" h="10" p="3" bg="black" px="8" text="sm:3" font="bold" b="b-1 gray-600") {{ subHeader }}  

  transition(name="slide-top")
    HeaderItem(v-if="activeMenuIndex != null" @onClickItem="onClicked" :header="siteTopHeaders[activeMenuIndex]")

  Popup(v-if="showIFrame")
    iframe(src="https://ix.foundation/lefi" w="full md:130" h="full md:115" )
</template>

<script lang="ts" setup>
import IconSoundOn from '~/assets/images/sound/sound-on.svg'
import IconSoundOff from '~/assets/images/sound/sound-off.svg'
import Hamburger from '~/assets/images/header/hamburger.svg'
import PlanetIX from '~/assets/images/header/planetix.svg'
import PlanetIXNew from '~/assets/images/header/planetix-new.svg'
import { buyIXTHeaderItems } from '~/composables/useSiteHeader'
const { siteTopHeaders } = useSiteHeader()

const menuTabs = ["buy ixt", "play now", "staking", "community"]
const activeMenuIndex = ref<number | null>(null)


const OpenMeny = (index: number) => {
  console.log("Open Menu", index);

  if (activeMenuIndex.value == index)
    return activeMenuIndex.value = null

  activeMenuIndex.value = index
}

const settingArr = ["Add funds", "0x000", "Account Settings", "Log Out"]

const { gotoIXPage } = useIXLinks()
const { user } = useUser()
const menuOpen = ref(false)
const { isSoundEnabled } = useSoundSettings()
const router = useRouter()


const showIFrame = ref(false)

const onClicked = (x: number, y: number) => {
  //console.log(mainHeaders[x].subHeaders[y])
  if (x == 0 && y == 1) {
    console.log("In if")
    showIFrame.value = true
  }
  // return OnClickSubHeader(mainHeaders[x].subHeaders[y].title);//goToPage(mainHeaders[x].subHeaders[y].title)
  //return goToPage(mainHeaders[x].subHeaders[y].title)
}

const goToPage = (title: string) => {
  switch (title) {
    case 'Polygon':
      return window.location.href = 'https://dashboard.ix.foundation/'
  }
}
const toggleSound = () => {
  isSoundEnabled.value = !isSoundEnabled.value
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  console.log('testing this area!')
  console.log(menuOpen.value)
}

</script>