<template lang="pug">
VList(pos="sticky top-0" z="99" w="full" @mouseenter="isSelected = true" @mouseleave="isSelected = false" ref="menuElement" space-x="6")
  HList(items="center"  bg="gray-800" px="4 md:7.5" h="16")
    NuxtLink(to="https://www.planetix.com")
      PlanetIXNew(w="42.25")

    HList(space-x="8" px="8" items="center" font="bold" text="lg" flex-grow="1" display="lt-md:none")
      HeaderLink(v-for="(item, index) in siteTopHeaders" @click="OpenMeny(index)" text="red") {{ $t(`marketplace.navigation.${item.type}.title`)}}

    HList(font="bold" space-x="6" px="0")
      HeaderLink(to="/" display="lt-md:none") help
      HeaderLink(to="/" display="lt-md:none")
        HelperLanguage(language="EN")
      HeaderAccountButton(@addFunds="iFrameToggle")
    div(grow="~" display="md:none")
    SettingsIcon(v-if="activeMenuIndex == null" pos="right" w="8" display="md:none" 
    @click="toggleMeny")


  Transition(name="slide-top" mode="out-in" )
    HeaderItem(v-if="activeMenuIndex != null" :key="activeMenuIndex" @onClickItem="onClicked" :header="siteTopHeaders[activeMenuIndex]" display="lt-md:none")

  Transition(name="slide-top")
    HeaderCategoryDropDown(v-if="activeMenuIndex != null" @swap="turnOnSwap" @ConnectWallet="toggleMeny" @close="toggleMeny" overflow-y="auto")


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

const OpenMeny = (index: number) => {
  console.log("Open Menu", index);

  if (activeMenuIndex.value == index)
    return activeMenuIndex.value = null

  activeMenuIndex.value = index
}

const toggleMeny = () => {
  if (activeMenuIndex.value == null)
    return activeMenuIndex.value = 1

  activeMenuIndex.value = null
}

const turnOnSwap = () => {
  console.log("turnOnSwap")
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