<template lang="pug">
VList(pos="sticky top-0" z="99" w="full" @mouseenter="isSelected = true" @mouseleave="isSelected = false" ref="menuElement" )
  HList(items="center"  bg="gray-800" px="4 md:7.5" h="16" space-x="6")
    NuxtLink(to="https://www.planetix.com")
      PlanetIXNew(w="42.25")

    div(flex-grow="1" display="lg:none")

    HList(space-x="8" px="8" items="center" font="bold" text="lg" flex-grow="1" display="lt-lg:none" translate-y="0.4" overflow-x="hidden" )
      HeaderLink(v-for="(item, index) in siteTopHeaders" @click="openMenu(index)" text="red") {{ $t(`marketplace.navigation.${item.type}.title`)}}

    HList(font="bold" space-x="6" px="0" translate-y="0.4")
      HeaderLink(to="/" display="lt-lg:none") help
      HeaderLink(to="/" display="lt-lg:none")
        HelperLanguage(language="EN" translate-y="-0.2")
      HeaderAccountButton(@addFunds="iFrameToggle")

    SettingsIcon(v-if="activeMenuIndex == null" pos="right" w="8" display="lg:none" 
    @click="toggleMenu")

  Transition(name="slide-top" mode="out-in" )
    HeaderItem(v-if="activeMenuIndex != null" :key="activeMenuIndex" @onClickItem="onClicked" :header="siteTopHeaders[activeMenuIndex]" display="lt-lg:none")

  Transition(name="slide-top")
    HeaderCategoryDropDown(v-if="activeMenuIndex != null" @swap="turnOnSwap" @ConnectWallet="toggleMenu" @close="toggleMenu" @clikedItem="onClicked" overflow-y="auto")


Popup(v-if="showIFrame")
  template(#header) Swap
  template(#default)
    VList(w="full" justify="center" items="center" display="lt-md:none")
      iframe(src="https://ix.foundation/lefi" w="full md:100" h="full md:116" )
    VList(w="full" justify="center" items="center" display="md:none")
      iframe(src="https://ix.foundation/lefi" w="100%" h="100")
</template>

<script lang="ts" setup>
import PlanetIXNew from '~/assets/images/header/planetix-new.svg'
import SettingsIcon from '~/assets/images/header/hamburger.svg'

import GlobeIcon from '~/assets/images/header/Globe.svg'
const { siteTopHeaders } = useSiteHeader()

const activeMenuIndex = ref<number | null>(null)

const openMenu = (index: number) => {
  //console.log("Open Menu", index);

  if (activeMenuIndex.value == index)
    return activeMenuIndex.value = null

  activeMenuIndex.value = index
}

const toggleMenu = () => {
  if (activeMenuIndex.value == null)
    return activeMenuIndex.value = 1

  activeMenuIndex.value = null
}

const turnOnSwap = () => {
  //console.log("turnOnSwap")
  showIFrame.value = true
  activeMenuIndex.value = null
}

const iFrameToggle = () => {
  showIFrame.value = !showIFrame.value
}

const isSelected = ref(false)
const menuElement = ref()

const showIFrame = ref(false)


const textColor = computed(() => {
  return 'isSelected'
})

const { t } = useI18n()

const onClicked = (type: string, category: string, item: string) => {
  //console.log("onClicked Header index", type, category, item)
  // const link = t(`marketplace.navigation.${type}.${category}.${item}.link`)
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

onClickOutside(menuElement, () => {
  showIFrame.value = false;
  if (!isSelected.value) {
    activeMenuIndex.value = null;
  }
})

</script>