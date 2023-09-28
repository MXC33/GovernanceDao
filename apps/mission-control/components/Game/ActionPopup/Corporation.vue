<template lang="pug">
GameActionPopup(:title="$t(`general.visit`)" :confirm-text="$t(`general.enter`)" @cancel="onClickCancel" @confirm="onClickEnter" :disable-confirm="isDisabled") 
  VList(space-y="4")
    IconCorporation(:corporation="corporation" w="20")
    div {{ $t(`corporations.${corporation}.mcIntro`) }}

</template>

<script lang="ts" setup>
const gameMenu = useGameMenu()
const { clickLink, linkType } = useCorporationLinks()
const isDisabled = computed(() => linkType(corporation.value) == 'disabled')

const { selectedCorporation } = useTileSelection()
const corporation = computed(() => selectedCorporation.value.corporation)

onUnmounted(() => gameMenu.value = null)

const onClickCancel = () => {
  gameMenu.value = null
}

const onClickEnter = () => {
  const { corporation } = selectedCorporation.value
  clickLink(corporation)
}

</script>