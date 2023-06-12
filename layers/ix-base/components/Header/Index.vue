<template lang="pug">
VList(pos="sticky top-0" z="99" w="full" @mouseenter="isSelected = true" @mouseleave="isSelected = false" ref="menuElement" )
  HList(items="center"  bg="gray-800" px="4 md:7.5" h="16" space-x="6")
    NuxtLink(to="https://www.planetix.com")
      PlanetIXNew(w="42.25")

    div(flex-grow="1" display="lg:none")

    HList(space-x="8" px="8" items="center" flex-grow="1" display="lt-lg:none" overflow-x="hidden" )
      button(v-for="(item, index) in siteTopHeaders" @click="openMenu(index)" btn="menu") {{ $t(`marketplace.navigation.${item.type}.title`)}}

    HList(space-x="6" px="0")
      //-button(btn="menu" display="lt-lg:none") help
      //-HeaderLanguage(language="EN")
      HeaderAccountButton()


    button(btn="menu" w="8" display="lg:none" @click="toggleMenu")
      Transition(name="fade" mode="out-in")
        SettingsIcon(v-if="activeMenuIndex == null")
        CrossIcon(v-else)

  Transition(name="slide-top" mode="out-in" )
    HeaderItem(v-if="activeMenuIndex != null" :key="activeMenuIndex" :header="siteTopHeaders[activeMenuIndex]" display="lt-lg:none" @onClickItem="")

  Transition(name="slide-top")
    HeaderMobile(v-if="activeMenuIndex != null" overflow-y="auto")

</template>

<script lang="ts" setup>
import CrossIcon from '~/assets/images/header/cross.svg'

import PlanetIXNew from '~/assets/images/header/planetix-new.svg'
import SettingsIcon from '~/assets/images/header/hamburger.svg'

const { siteTopHeaders } = useSiteHeader()
const {state: swapVisible} = useIXTSwapVisible()
const activeMenuIndex = ref<number | null>(null)

const route = useRoute()

const onClickItem = (type: string, catagory: string, item: string) => {
  switch(item){
    case 'swap':
      return swapVisible.value = true;
  }
}

const openMenu = (index: number) => {

  if (activeMenuIndex.value == index)
    return activeMenuIndex.value = null

  activeMenuIndex.value = index
}

const toggleMenu = () => {
  if (activeMenuIndex.value == null)
    return activeMenuIndex.value = 1

  closeMenu()
}

const isSelected = ref(false)
const menuElement = ref()
const closeMenu = () => 
  activeMenuIndex.value = null;

onClickOutside(menuElement, () => {
  if (!isSelected.value) 
    closeMenu()
})

watch([swapVisible, route], ([visible]) => {
  if(visible)
    closeMenu()
})

</script>