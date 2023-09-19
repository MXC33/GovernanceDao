<template lang="pug">
VList(:class="className" pos="sticky top-0" translate-y="$header-offset" z="99" w="full" @mouseenter="isSelected = true" @mouseleave="isSelected = false" ref="menuElement" transition="all")
  HList(items="center" justify="between" bg="ix-black" px="4 md:7.5" h="$header-height-mobile md:$header-height-desktop" space-x="6")
    NuxtLink(to="https://www.planetix.com")
      template(v-if="$slots.logo")
        slot(name="logo")
      PlanetIXNew(v-else w="42.25")

    HList(display="lt-lg:none" justify="start" flex-grow="1" overflow-x="hidden" space-x="4")
      button(v-for="(header, index) in headerData" @mouseenter="hoverMenu(index)" @click="openMenu(index)" btn="menu" color = "s-default:white s-selected:ix-orange" :state="selected(index)") {{ header.name }}

      HList(flex-grow="1" justify="end" display="lt-md:none")
        NuxtLink(to="https://planetix.com/airdrop")
          HList(rounded="full" b="1 $mc-mint" px="4" py="1" bg="hover:$mc-mint-40" uppercase="~" tracking="0.65" font="bold" items="center" justify="center" class="border-white-ixt")
            span(translate-x="0.5") airdrop
    div(display="lt-lg:none")
      Notification()    

    HList(items="center" space-x="6" px="0")
      //-button(btn="menu" display="lt-lg:none") help
      //-HeaderLanguage(language="EN")
      slot(name="contentRight")

      HeaderAccountButton(class="border-white-ixt")

      div(display="lg:none")
        Notification()

      button.hamburger-menu(v-if="isMobile" btn="menu" @click="toggleMenu" ml="2")
        SettingsIcon(v-if="activeMenuIndex == null" w="6" )
        CrossIcon(v-else w="6" )

  Transition(name="slide-top" mode="out-in")
    HeaderNavigation(:class="className + '-header'" v-if="activeMenuIndex != null && headerData != null"  :key="activeMenuIndex" :header="headerData[activeMenuIndex]")

</template> 

<script lang="ts" setup>
import CrossIcon from '~/assets/images/header/cross.svg'
import PlanetIXNew from '~/assets/images/header/planetix-new.svg'
import SettingsIcon from '~/assets/images/header/hamburger.svg'

const { className } = defineProps<{
  className?: string
}>()

const { isMobile } = useDevice()
const { data: headerData } = useHeaderData()

const { state: swapVisible } = useIXTSwapVisible()

const activeMenuIndex = useHeaderIndex()
const isSelected = shallowRef(false)
const menuElement = shallowRef()

const route = useRoute()
const scollingDown = shallowRef(false)

const { refreshIXTBalance } = useIXTContract()
const windowY = useGlobalWindowScroll()
const { isWalletConnected } = useWallet()

watch(isWalletConnected, (connected) => {
  // Adds a timeout because sometimes it seems to be a race condition with contract being setup
  if (connected)
    setTimeout(() => refreshIXTBalance(), 10)
}, { immediate: true })


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

const hoverMenu = (index: number) => {
  activeMenuIndex.value = index
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


<style>
:root {
  --header-height-mobile: 3rem;
  --header-height-desktop: 4rem;
}
</style>
