<template lang="pug">
VList(:class="className" pos="sticky left-0 top-0" translate-y="$header-offset" z="99" w="full" @mouseleave="onMouseLeave" ref="menuElement" transition="all")
  VList(pos="relative" z="2" bg="$header-background" px="4 md:7.5" )
    HeaderAdBanner(mx="-4 md:-7.5" ref="bannerEl")
    HeaderMenu(ref="menuEl")
      template(#logo v-if="$slots.logo")
        slot(name="logo")

  //For teleports
  div(id="navigation-bottom" pos="relative" px="4 md:7.5" )

  Transition(name="slide-top" mode="out-in")
    HeaderNavigation(v-if="activeHeaderIndex != null && headerData != null"  :key="activeHeaderIndex" :header="headerData[activeHeaderIndex]" @close="activeHeaderIndex = null")

  slot(name="contentBottom")


HeaderLifiWidget(v-if="swapVisible" @close="swapVisible = false")

component(is="style").
  :root { 
    --site-header-offset: {{ siteHeaderOffset }}px;
    --header-offset: {{ siteHeaderScrollOffset }}px;
    --header-height: {{ headerHeight }}px;
  }
  
</template> 

<script lang="ts" setup>

const { className, autoClose } = defineProps<{
  className?: string,
  autoClose?: boolean
}>()

const bannerEl = ref()
const menuEl = ref()
const { data: headerData } = useHeaderData()
const { useMobileBreakpoint } = useDevice()
const isMobile = useMobileBreakpoint('lg')
const { state: swapVisible } = useIXTSwapVisible()
const onMouseLeave = () => {
  if (isMobile.value)
    return

  activeHeaderIndex.value = null
}
const { headerHeight, activeHeaderIndex, siteHeaderOffset, siteHeaderScrollOffset, isScrollingDown, autoHideActive } = useSiteHeader()
const menuElement = shallowRef()

autoHideActive.value = autoClose

const { height: bannerHeight } = useElementBounding(bannerEl)
const { height: menuHeight } = useElementBounding(menuEl)


effect(() => {
  const newHeight = Math.round(bannerHeight.value + menuHeight.value)

  headerHeight.value = newHeight

})

const route = useRoute()

const { refreshIXTBalance } = useIXTContract()
const windowY = useGlobalWindowScroll()
const { isLoggedInAndConnected } = useLogin()
const mounted = useMounted()

watch([isLoggedInAndConnected, mounted], ([loggedIn, mounted]) => {
  if (loggedIn || !mounted) {
    return
  }

  refreshIXTBalance()
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

const closeMenu = () =>
  activeHeaderIndex.value = null;

onClickOutside(menuElement, () => {
  closeMenu()
})


</script>
