<template lang="pug">
VList(pos="sticky top-0" z="99" w="full" @mouseenter="isSelected = true" @mouseleave="isSelected = false")
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

    VList(items="center" pos="relative" ref="menuElement")
      HeaderLink(h="10" b="1 $mc-orange" color="$mc-orange" bg="" px="8" display="lt-md:none" to="/connect" items="center" v-if="walletState !== 'connected'") CONNECT WALLET
      HList(h="10" b="1 $mc-mint" color="$mc-mint" font="bold" bg="$mc-mint-20" px="8" display="lt-md:none" @click="toggleMenu" items="center" v-else-if="walletState == 'connected'") 2,234,128 IXT
      VList(v-if="menuOpen" pos="absolute top-full left-0 right-0" b="1 gray-400" items="left") 
        //- div(v-for="subHeader in settingArr" h="10" p="3" bg="black" px="8" text="sm:3" font="bold" b="b-1 gray-600") {{ subHeader }}  
        div(h="10" p="3" bg="black" font="bold" px="4" b="b-1 gray-600" @click="toggleMenuButton" color="hover:$mc-orange") Add funds
        div(h="10" p="3" bg="black" font="bold" px="4" b="b-1 gray-600" @click="toggleMenuButton" color="hover:$mc-orange") 0x000 
          Copy(w="6" pos="absolute right-0")
        div(h="10" p="3" bg="black" font="bold" px="4" b="b-1 gray-600" @click="toggleMenuButton" color="hover:$mc-orange") Account Settings
        HeaderLink(h="10" p="3" bg="black" font="bold" px="4" b="b-1 gray-600" to="/connect" color="hover:$mc-orange" @click="toggleMenu") Log out

  Transition(name="slide-top" mode="out-in")
    HeaderItem(v-if="activeMenuIndex != null" :key="activeMenuIndex" @onClickItem="onClicked" :header="siteTopHeaders[activeMenuIndex]")

  Popup(v-if="showIFrame")
    iframe(src="https://ix.foundation/lefi" w="full md:130" h="full md:115" )
</template>

<script lang="ts" setup>
import IconSoundOn from '~/assets/images/sound/sound-on.svg'
import IconSoundOff from '~/assets/images/sound/sound-off.svg'
import PlanetIXNew from '~/assets/images/header/planetix-new.svg'
import Copy from '~/assets/images/header/copy.svg'
const { siteTopHeaders } = useSiteHeader()

const activeMenuIndex = ref<number | null>(null)

const OpenMeny = (index: number) => {
  console.log("Open Menu", index);

  if (activeMenuIndex.value == index)
    return activeMenuIndex.value = null

  activeMenuIndex.value = index
}

const { walletAdress, walletState } = useWallet()
const { user } = useUser()
const menuOpen = ref(false)
const menuButton1 = ref(false)
const loggedIn = ref(false)
const isSelected = ref(false)
const walletAd = ref(walletAdress.value)
const menuElement = ref()
const { isSoundEnabled } = useSoundSettings()

const showIFrame = ref(false)

const { t } = useI18n()

const onClicked = (type: string, category: string, item: string) => {
  //console.log("onClicked Header index", type, category, item)
  // const link = t(`marketplace.headers.${type}.${category}.${item}.link`)
  // if (link != '') {
  //   return navigateTo(link, { external: true })
  // }
  // console.log("No link")

  switch (item) {
    case 'swap':
      return showIFrame.value = true
  }
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
}

const toggleMenuButton = () => {
  menuButton1.value = !menuButton1.value
  console.log("Clicked?" + menuButton1.value)
  console.log('wallet is connecting?')
  console.log(walletAdress.value)
  console.log(walletState.value)
}

onClickOutside(menuElement, () => {
  menuOpen.value = false;
  if (!isSelected.value) {
    activeMenuIndex.value = null;
  }
})

</script>