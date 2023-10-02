<template lang="pug">
VList(v-if="gameMenu == 'mc-settings'" w="lt-md:full")
  GameSettingsSlideout(:title="name" :is-open="showMenu" @close="closeMenu")
    template(#nested-header)
      div() {{  $t(`general.navigation.settings.title`) }}

    template(#default)
      VList(bg="gray-900 opacity-80%" pos="fixed md:right-4 top-12 md:top-16" w="full md:70" inset="lt-md:0" m="!l-0" z="1" p="3")
        HList(v-if="!inGraphicsSettings" b="b-1 t-1 white opacity-10" w="full" px="3" pos="absolute top-0 left-0 right-0")

          GameSettingsSound(py="2")

      HList(b="on-inactive:b-1 white opacity-10" :inactive="!inGraphicsSettings" px="3" pos="absolute top-22 left-0 right-0" z="999")
        GameSettingsGraphics(@show-settings="toggleMenu" :showSettings="inGraphicsSettings" py="2")

</template>

<script setup lang="ts">
const gameMenu = useGameMenu()
const showMenu = useSiteSettings()
const name = 'settings'
const inGraphicsSettings = ref(false)

const toggleMenu = () => {
  inGraphicsSettings.value = !inGraphicsSettings.value
}

const closeMenu = () => {
  showMenu.value = false
  gameMenu.value = null
}

</script>