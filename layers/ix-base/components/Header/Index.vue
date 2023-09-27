<template lang="pug">
VList(:class="className" pos="sticky left-0 top-0" translate-y="$header-offset" z="99" w="full" @mouseleave="onMouseLeave" ref="menuElement" transition="all" bg="ix-black" px="4 md:7.5" )
  HeaderAdBanner(mx="-4 md:-7.5" ref="bannerEl")

  HList(items="center" justify="between" h="16" space-x="3" ref="menuEl")
    NuxtLink(to="https://www.planetix.com")
      template(v-if="$slots.logo")
        slot(name="logo")
      PlanetIXNew(v-else w="42.25")

    HList(v-if="!isMobile" justify="start" flex-grow="1" overflow-x="hidden" space-x="4")
      button(v-for="(header, index) in headerData" @mouseenter="hoverMenu(index)" @click="openMenu(index)" btn="menu" color = "s-default:white s-selected:ix-orange" :state="selected(index)") {{ header.name }}

      HList(flex-grow="1" justify="end" display="lt-md:none")
        NuxtLink(to="https://planetix.com/airdrop")
          HList(rounded="full" b="1 $mc-mint" px="4" py="1" bg="hover:$mc-mint-40" uppercase="~" tracking="0.65" font="bold" items="center" justify="center" class="border-white-ixt")
            span(translate-x="0.5") airdrop


    HList(items="center" space-x="3" px="0")
      //-button(btn="menu" display="lt-lg:none") help
      //-HeaderLanguage(language="EN")
      slot(name="contentRight")

      Notification(display="lt-lg:none")

      HeaderAccountButton(class="border-white-ixt")

      div(display="lg:none")
        Notification()

      button.hamburger-menu(v-if="isMobile" btn="menu" @click="toggleMenu" ml="2")
        SettingsIcon(v-if="activeHeaderIndex == null" w="6")
        CrossIcon(v-else w="6" )

  //For teleports
  div(id="navigation-bottom" pos="relative")

  Transition(name="slide-top" mode="out-in")
    HeaderNavigation(:class="className + '-header'" v-if="activeHeaderIndex != null && headerData != null"  :key="activeHeaderIndex" :header="headerData[activeHeaderIndex]")

HeaderLifiWidget(v-if="swapVisible" @close="swapVisible = false")

  slot(name="contentBottom")

  component(is="style").
    :root { 
      --site-header-offset: {{ siteHeaderOffset }}px;
      --header-offset: {{ siteHeaderScrollOffset }}px;
      --header-height: {{ headerHeight }}px;
    }
</template> 

<script lang="ts" setup>
import CrossIcon from '~/assets/images/header/cross.svg'
import PlanetIXNew from '~/assets/images/header/planetix-new.svg'
import SettingsIcon from '~/assets/images/header/hamburger.svg'

const { className } = defineProps<{
  className?: string
}>()

const bannerEl = ref()
const menuEl = ref()
const { useMobileBreakpoint } = useDevice()
const isMobile = useMobileBreakpoint()
const { data: headerData } = useHeaderData()

const { state: swapVisible } = useIXTSwapVisible()
const onMouseLeave = () => {
  activeHeaderIndex.value = null
}
const { headerHeight, activeHeaderIndex, siteHeaderOffset, siteHeaderScrollOffset, isScrollingDown } = useSiteHeader()
const menuElement = shallowRef()

const { height: bannerHeight } = useElementBounding(bannerEl)
const { height: menuHeight } = useElementBounding(menuEl)

effect(() => {
  const newHeight = Math.round(bannerHeight.value + menuHeight.value)
  if (newHeight != headerHeight.value)
    headerHeight.value = newHeight
})

const route = useRoute()

const { refreshIXTBalance } = useIXTContract()
const windowY = useGlobalWindowScroll()
const { isWalletConnected } = useWallet()

watch(isWalletConnected, (connected) => {
  // Adds a timeout because sometimes it seems to be a race condition with contract being setup
  if (connected)
    setTimeout(() => refreshIXTBalance(), 10)
}, { immediate: true })


watch(windowY, (newValue, oldValue) =>
  isScrollingDown.value = (newValue > oldValue)
)

watch(isScrollingDown, (active) => {
  document.body.classList.toggle('is-scrolling-down', active)
})

watch([swapVisible, route], ([visible]) => {
  if (visible)
    closeMenu()
})

const selected = (index: number) => {
  if (activeHeaderIndex.value == index) {
    return 'selected'
  }

  return 'default'
}

const hoverMenu = (index: number) => {
  activeHeaderIndex.value = index
  //console.log('hoverMenu', index)
}

const openMenu = (index: number) => {
  if (activeHeaderIndex.value == index)
    return activeHeaderIndex.value = null

  activeHeaderIndex.value = index
}

const toggleMenu = () => {
  if (activeHeaderIndex.value == null)
    return activeHeaderIndex.value = 1

  closeMenu()
}

const closeMenu = () =>
  activeHeaderIndex.value = null;

onClickOutside(menuElement, () => {
  closeMenu()
})


</script>
