<template lang="pug">
VList(pos="sticky top-0" translate-y="$header-offset" z="99" w="full" @mouseenter="isSelected = true" @mouseleave="isSelected = false" ref="menuElement" transition="all")
  HList(items="center" justify="between" bg="ix-black" px="4 md:7.5" h="12 md:16" space-x="6")
    NuxtLink(to="https://www.planetix.com")
      PlanetIXNew(w="42.25")

    HList(justify="start" flex-grow="1" display="lt-lg:none" overflow-x="hidden" space-x="4")
      button(v-for="(item, index) in siteTopHeaders" @click="openMenu(index)" btn="menu" color = "s-default:white s-selected:ix-orange" :state="selected(index)") {{ $t(`marketplace.navigation.${item.type}.title`)}}
      HList(flex-grow="1" justify="end" display="lt-md:none")
        NuxtLink(to="https://planetix.com/airdrop")
          HList(rounded="full" b="1 $mc-mint" px="4" py="1" bg="hover:$mc-mint-40" uppercase="~" tracking="0.65" font="bold" items="center" justify="center")
            span(translate-x="0.5") airdrop

    HList(space-x="6" px="0")
      //-button(btn="menu" display="lt-lg:none") help
      //-HeaderLanguage(language="EN")
      HeaderAccountButton()


      button(btn="menu" display="lg:none" @click="toggleMenu" ml="2")
        Transition(name="fade" mode="out-in")
          SettingsIcon(v-if="activeMenuIndex == null" w="6" )
          CrossIcon(v-else w="6" )

Transition(name="slide-top" mode="out-in")
  HeaderDesktop(v-if="activeMenuIndex != null" :key="activeMenuIndex" :header="siteTopHeaders[activeMenuIndex]" display="lt-lg:none" @onClickItem="")

Transition(name="slide-top" )
  HeaderMobile(v-if="activeMenuIndex != null" overflow-y="auto" display="lg:none" @close="toggleMenu")

</template>

<script lang="ts" setup>
import CrossIcon from '~/assets/images/header/cross.svg'
import PlanetIXNew from '~/assets/images/header/planetix-new.svg'
import SettingsIcon from '~/assets/images/header/hamburger.svg'
import { useGlobalWindowScroll } from '@ix/marketplace/composables/useWindowScroll';

const { siteTopHeaders } = useSiteHeader()
const { state: swapVisible } = useIXTSwapVisible()

const activeMenuIndex = shallowRef<number | null>(null)
const isSelected = shallowRef(false)
const menuElement = shallowRef()

const route = useRoute()
const scollingDown = shallowRef(false)

const windowY = useGlobalWindowScroll()
watch(windowY, (newValue, oldValue) =>
  scollingDown.value = (newValue > oldValue)
)

watch(scollingDown, (active) => {
  document.body.classList.toggle('is-scrolling-down', active)
})

watch([swapVisible, route], ([visible]) => {
  if (visible)
    closeMenu()
})

const selected = (index: number) => {
  if (activeMenuIndex.value == index) {
    return 'selected'
  }

  return 'default'
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

const closeMenu = () =>
  activeMenuIndex.value = null;

onClickOutside(menuElement, () => {
  if (!isSelected.value)
    closeMenu()
})


</script>