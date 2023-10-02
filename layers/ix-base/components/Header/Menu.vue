<template lang="pug">
HList(items="center" justify="between" h="16" space-x="3" ref="menuEl")
  NuxtLink(to="https://www.planetix.com")
    template(v-if="$slots.logo")
      slot(name="logo")

    PlanetIXNew(v-else w="42.25")

  HList(v-if="!isMobile" justify="start" flex-grow="1" overflow-x="hidden" space-x="4")
    button(v-for="(header, index) in headerData" @mouseenter="hoverMenu(index)" @click="openMenu(index)" btn="menu" color = "s-default:white s-selected:ix-orange" :state="selected(index)") {{ header.name }}
    
    HList(flex-grow="1" justify="end" display="lt-md:none")
      a(href="https://planetix.com/airdrop")
        span(rounded="full" b="1 $mc-mint" px="4" py="1" bg="hover:$mc-mint-40" uppercase="~" tracking="0.65" font="bold" items="center" justify="center" class="border-white-ixt" flex="~")
          span(translate-x="0.5") airdrop


  HList(items="center" space-x="3" px="0")
  
    slot(name="contentRight")
    button(p="2" @click="toggleMenu" whitespace="nowrap" frame="~")
      Transition(name="fade-slow" mode="out-in")
        span(v-if="walletState == 'disconnected'") {{ $t(`general.navigation.menu.connectWallet`)}}

        span(v-else-if="ixtBalance != undefined" w="25" text="ix-mint") {{ roundToDecimals(ixtBalance, 2) }} IXT
    Notification(display="lt-lg:none")
    //-class="border-white-ixt"
    HeaderAccountButton()
      template(#dropdown)
        slot(name="dropdown")

    div(display="lg:none")
      Notification()

    button.hamburger-menu(v-if="isMobile" btn="menu" @click="toggleMenu" ml="2")
      SettingsIcon(v-if="activeHeaderIndex == null" w="6")
      CrossIcon(v-else w="6" )

</template> 

<script lang="ts" setup>
import CrossIcon from '~/assets/images/header/cross.svg'
import PlanetIXNew from '~/assets/images/header/planetix-new.svg'
import SettingsIcon from '~/assets/images/header/hamburger.svg'

const menuEl = ref()
const { useMobileBreakpoint } = useDevice()
const isMobile = useMobileBreakpoint()
const { data: headerData } = useHeaderData()

const { ixtBalance, ixtPending } = useIXTContract()
const { walletState } = useWallet()


const { refreshIXTBalance } = useIXTContract()
const { isWalletConnected } = useWallet()
const { activeHeaderIndex } = useSiteHeader()

watch(isWalletConnected, (connected) => {
  if (connected)
    setTimeout(() => refreshIXTBalance(), 10)
}, { immediate: true })


const selected = (index: number) => {
  if (activeHeaderIndex.value == index) {
    return 'selected'
  }

  return 'default'
}

const hoverMenu = (index: number) => {
  activeHeaderIndex.value = index
}

const openMenu = (index: number) => {
  if (activeHeaderIndex.value == index)
    return activeHeaderIndex.value = null

  activeHeaderIndex.value = index
}

const toggleMenu = () => {
  if (activeHeaderIndex.value == null)
    return activeHeaderIndex.value = 1

  activeHeaderIndex.value = null
}

</script>
