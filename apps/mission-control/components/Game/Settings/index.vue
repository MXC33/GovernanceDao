<template lang="pug">
div(pointer-events="auto")
  Teleport(to="#navigation-bottom")
    Transition(name="slide-right")
      GameSettingsDesktop(v-if="showMenu" ref="element")

  //- GameSettingsMobile(display="md:none")
</template>


<script lang="ts" setup>
const showMenu = useSiteSettings()
const element = ref()
const gameMenu = useGameMenu()

onClickOutside(element, () => {
  showMenu.value = false
  gameMenu.value = null
}, { ignore: ["#settings-menu"] })
</script>