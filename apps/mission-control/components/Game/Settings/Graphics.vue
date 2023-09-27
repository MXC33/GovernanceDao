<template lang="pug">
VList(color="white" items="start" justify="center" w="full")
  ButtonSound(v-if="!showSettings" @click="toggleMenu" w="full" sound="sm" text="left")
    HList(space-x="2" group)
      div() {{ $t(`general.navigation.settings.graphics-Settings`) }}:
      div(color="mc-mint group-hover:mc-mint_80") {{ $t(`general.navigation.settings.${settingsQuality[gameQuality]}`)  }}
  //-div(v-if="!showSettings" @click="toggle") Graphics Settings: {{ settingsQuality[getGraphicState()] }}

  VList(v-else pos="lt-md:fixed top-12 left-0" w="full")
    span(pl="4" color="white" py="2" uppercase="~" b="b-1 white opacity-40") choose quality settings:

    GameSettingsOption(v-for="(text, index) in settingsQuality" :title="$t(`general.navigation.settings.${text}`)" py="2" px="4" :quality="index" @close-menu="toggleMenu")

    HList(v-if="showSettings" display="md:none" w="full" items="center" justify="end" py="2" px="6 md:2" b="t-1 white opacity-10" font="normal")
      ButtonSound(color="white hover:opacity-60" sound="sm" uppercase="~" @click="toggleMenu")
        GlitchText(:text="$t(`general.navigation.settings.back`)")

</template>

<script setup lang="ts">
const { gameQuality, getGraphicState } = useGameInterface()

const { showSettings } = defineProps<{
  showSettings: boolean,
}>()

const emits = defineEmits(["show-settings"])

const settingsQuality = ['low', 'medium', 'high']

const length = settingsQuality.length - 1

const toggleMenu = () => {
  emits('show-settings')
}
</script>