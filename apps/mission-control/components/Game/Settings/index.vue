<template lang="pug">
div(pointer-events="auto")
  Teleport(to="#navigation-bottom")
    Transition(name="fade")
      GameSettingsDesktop(display="lt-md:none" v-if="showMenu" ref="desktop")

  GameSettingsMobile(display="md:none")
</template>


<script lang="ts" setup>
const showMenu = useSiteSettings()
const desktop = ref()
onClickOutside(desktop, () => {
  showMenu.value = false
}, { ignore: ["#settings-menu"] })
</script>