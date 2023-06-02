<template lang="pug">
div()
  VList(pos="sticky top-0" z="99" w="full" @mouseenter="isSelected = true" @mouseleave="isSelected = false" ref="menuElement")
    HList(items="center"  bg="gray-800" px="7.5" h="16")
      NuxtLink(to="https://www.planetix.com")
        PlanetIXNew(w="42.25")

      HList(space-x="8" px="8" items="center" font="bold" text="lg" flex-grow="1")
        HeaderLink(v-for="(item, index) in siteTopHeaders" @click="OpenMeny(index)" text="red") {{ $t(`marketplace.headers.${item.type}.title`)}}

      HList(font="bold" space-x="6" px="6")
        HeaderLink(to="/" display="lt-md:none") help
        HeaderLink(to="/" display="lt-md:none")
          HelperLanguage(language="EN")
        HeaderAccountButton()
    Transition(name="slide-top" mode="out-in")
      HeaderItem(v-if="activeMenuIndex != null" :key="activeMenuIndex" @onClickItem="onClicked" :header="siteTopHeaders[activeMenuIndex]")
    Transition(name="slide-top" mode="out-in")
      HeaderCategoryDropDown()

  Popup(v-if="showIFrame")
    template(#header) Swap
    template(#default)
      VList(w="full" justify="center" items="center" display="lt-md:none")
        iframe(src="https://ix.foundation/lefi" w="full md:100" h="full md:116" )
</template>

<script lang="ts" setup>
import PlanetIXNew from '~/assets/images/header/planetix-new.svg'
const { siteTopHeaders } = useSiteHeader()

const activeMenuIndex = ref<number | null>(null)

const OpenMeny = (index: number) => {
  console.log("Open Menu", index);

  if (activeMenuIndex.value == index)
    return activeMenuIndex.value = null

  activeMenuIndex.value = index
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

onClickOutside(menuElement, () => {
  showIFrame.value = false;
  if (!isSelected.value) {
    activeMenuIndex.value = null;
  }
})

</script>