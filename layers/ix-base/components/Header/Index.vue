<template lang="pug">
VList(:class="className" pos="sticky left-0 top-0" translate-y="$header-offset" font="gridnik" text="base" z="99" w="full" @mouseleave="onMouseLeave" ref="menuElement" transition="all")
  VList(pos="relative" z="2" bg="$header-background")
    //- SplashBanner(ref="bannerEl" v-if="bannerAdActive")
    //- HeaderMenu(ref="menuEl"  px="4 md:7.5" )
    //-   template(#logo v-if="$slots.logo")
    //-     slot(name="logo")

    //-   template(#contentRight v-if="$slots.contentRight")
    //-     slot(name="contentRight")

  //For teleports
  div(id="navigation-bottom" pos="relative" px="4 md:7.5" )

  //- Transition(name="slide-top" mode="out-in")
  //-   HeaderNavigation(v-if="activeHeaderIndex != null && headerData != null"  :key="activeHeaderIndex" :header="headerData[activeHeaderIndex]" @close="activeHeaderIndex = null")

  slot(name="contentBottom")

  div(display="none")
    div(wh="6")
    div(wh="4")
    div(wh="10")
    NotificationIconUnreadMessage()
    NotificationIconUnread()

HeaderLifiWidget(v-if="swapVisible" @close="swapVisible = false")

component(is="style").
  :root {
    --site-header-offset: {{ siteHeaderOffset }}px;
    --header-offset: {{ siteHeaderScrollOffset }}px;
    --header-height: {{ headerHeight }}px;
  }

</template>

<script lang="ts" setup>

// const { fetchHeaderData } = useSiteHeader()
// const { data: headerData, execute: fetchHeader } = fetchHeaderData()
// await fetchHeader()

const { topBannerAd, bannerAdActive } = useAds()
const { data: topBannerData, execute: fetchTopBannerData } = topBannerAd()
await fetchTopBannerData()

const { useMobileBreakpoint } = useDevice()
const { state: swapVisible } = useIXTSwapVisible()




const { className, autoClose } = defineProps<{
  className?: string,
  autoClose?: boolean
}>()

const bannerEl = ref()
const menuEl = ref()

const isMobile = useMobileBreakpoint('lg')


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
const windowY = useGlobalWindowScroll()

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
