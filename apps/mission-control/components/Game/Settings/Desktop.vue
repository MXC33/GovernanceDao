<template lang="pug">
VList(pos="fixed md:right-4 top-16 s-adBanner:top-24" z="10" :state="getBannerStatues" text="sm")
  VList(v-if="showMenu" w="md:70" inset="lt-md:0" m="!l-0" z="1" space-y="1")

    HList(items="center" fill="white" justify="between" cut="bottom-right s-md b-gray-400" bg="mc-black opacity-60" py="2.5" px="4" backdrop="blur-md")
      TitleWithIcon(color="mc-orange" font="bold" text-shadow="mc-orange" fill="mc-orange" icon="pointer")
        GlitchText(:text="$t(`general.navigation.settings.title`)")

      HList(w="full" justify="end" cursor="pointer")
        ButtonSound(v-if="!inGraphicsSettings" sound="sm" @click="closeSettings")
          CloseIcon(w="3" fill="white opacity-90 hover:opacity-40")

        HList(v-else justify="end" cursor="pointer" text="xs" w="full")
          ButtonSound(color="white hover:opacity-60" sound="sm" uppercase="~" @click="backToSettings")
            GlitchText(:text="$t(`general.navigation.settings.back`)")

    VList(b="1 gray-400" bg="mc-black opacity-60" backdrop="blur-md")
      VList(v-if="!inGraphicsSettings" px="4")
        GameSettingsSound()
      VList(v-if="!inGraphicsSettings" pl="4" b="b-1 white opacity-60" ml="4")
      VList(:active="inGraphicsSettings" py="2 on-active:0" px="4 on-active:0")
        GameSettingsGraphics(@show-settings="toggleMenu" :showSettings="inGraphicsSettings")

    //- VList(display="lt-md:none" w="full" h="5" cut="top-right s-sm b-gray-400")
</template>

<script setup lang="ts">
import CloseIcon from '~/assets/images/ui/close.svg?component'

const showMenu = useSiteSettings()

const inGraphicsSettings = ref(false)

const toggleMenu = () => {
  inGraphicsSettings.value = !inGraphicsSettings.value
}

const { isBannerActive } = useAds()
const getBannerStatues = computed(() => {
  if (isBannerActive.value)
    return 'adBanner'

  return ''
})

const backToSettings = () => {
  inGraphicsSettings.value = false
}

const closeSettings = () => {
  inGraphicsSettings.value = false
  showMenu.value = false
}

</script>