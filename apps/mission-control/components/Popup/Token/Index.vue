<template lang="pug">
VList(flex-grow="lt-md:1" space-y="2" max-w="180" mx="auto" w="full" color="gray_50" overflow-y="auto" )

  VList(bg="$mc-accent-60" cut="top-right" p="x-2 y-1" font="bold" pos="sticky top-0")
    TitleWithIcon(icon="pointer") {{ popup.title }}

  VList(bg="black opacity-80" flex-grow="lt-md:1" b="md:1 $mc-accent-40" p="4" space-y="4" scrollbar="~ mc" h="lt-md:full")
    PopupTokenMessage(:popup="popup")

    PopupTokenItemList(:items="popup.infoItems" v-if="popup.infoItems")

    PopupTokenSlideshow(:items="popup.slideShow" v-if="popup.slideShow")

  div(grid="md:~ cols-3 gap-4" b="lt-md:t-1 mc-mint" items="end" justify="md:end" p="md:y-2" pos="sticky bottom-0")

    PopupTokenButton(grid="md:col-start-2" btn="~ secondary-outline" @click="onClickSecondary" v-if="popup.secondaryLink") {{ popup.secondaryLink.text }}

    PopupTokenButton(grid="md:col-start-3" w="lt-md:full" btn="~ primary-outline" @click="onClickPrimary" v-if="popup.primaryLink")
      | {{ popup.primaryLink.text }}
    
</template>

<script setup lang="ts">
import type { PopupToken } from '~~/composables/usePopupToken';
const { openPopupLink } = usePopupToken()

const onClickSecondary = async () => {
  await openPopupLink(props.popup.secondaryLink)
}

const onClickPrimary = async () => {
  await openPopupLink(props.popup.primaryLink)
}

const props = defineProps<{
  popup: PopupToken
}>()
</script>
