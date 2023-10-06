<template lang="pug">
main(w="full" h="full" flex="~ col grow" min-h="0")
  Header()
    template(#contentRight)
      HeaderButton#settings-menu(@click="toggleSettings" wh="6")
        Settings(wh="6" fill="white")

    template(#dropdown)
      NuxtLink(to="/terminal")
        HeaderSubmenuButton(b="t-1 b-1 gray-400") {{ $t(`layouts.headers.terminal`)}}

      //- button(@click="toggleSound" wh="6" opacity="hover:80" transition="opacity")
      //-   SoundOn(v-if="isSoundEnabled" fill="white")
      //-   SoundOff(v-else fill="white")    

  //- Used for teleports
  div(id="overlays" select="none")

  slot
</template>

<script lang="ts" setup>
import Settings from '~/assets/images/ui/settings.svg'
import SoundOff from '~/assets/images/ui/icon-sound-off.svg'
import SoundOn from '~/assets/images/ui/icon-sound-on.svg'

const settingsOpen = useSiteSettings()
const { useMobileBreakpoint } = useDevice()
const isMobile = useMobileBreakpoint('lg')
const gameMenu = useGameMenu()

const { isSoundEnabled } = useSoundSettings()

const toggleSound = () => {
  isSoundEnabled.value = !isSoundEnabled.value
}

const toggleSettings = () => {
  if (settingsOpen.value) {
    settingsOpen.value = false
    if (isMobile.value)
      gameMenu.value = null
  } else {
    settingsOpen.value = true
    if (isMobile.value) {
      console.log("inside toggle settings else")
      gameMenu.value = null
      gameMenu.value = 'mc-settings'
    }
    else
      gameMenu.value = null
  }
}
</script>