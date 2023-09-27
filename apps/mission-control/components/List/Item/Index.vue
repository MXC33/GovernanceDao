<template lang="pug">
ButtonSound(flex="~ col" justify="start" cursor="on-no-select:default" pos="relative" group sound="lg" :selected="isSelected" :active="isActive")

  HList(cut="top-right b-gray-200 on-selected:b-mc-mint hover:b-mc-mint" :claim="canClaim" w="full" :selected="isSelected" items="center" pos="relative")
    slot(name="corner-info")

    slot(name="progressbar")

    VList(p="2" z="-2")
      TokenSlideshow(w="20" h="20" :icon="true" :tokens="tokens" v-if="tokens")

      TokenImage(:token="token" w="20" h="20" :key="getNftTokenKey(token, '-', true)" v-else-if="token")

      img(:src="imagePath" w="20" v-else)

    VList(flex-grow="1" p="x-2 y-3" min-w="0" items="start" pos="relative" uppercase="~" align="left")
      slot

  VList(v-if="$slots.button" w="full" pos="relative" bg="black" mt="-1px" cursor="on-blocked:default" :blocked="isButtonDisabled")
    ButtonSound(btn="~ primary-outline-opaque on-blocked:disable sm" sound="sm" flex="~ row" uppercase="~" w="full" space-x="2" @click="$emit('clickAction')" b="on-selected:mc-mint" :selected="isSelected" :blocked="isButtonDisabled")
      slot(name="button")

</template>


<script setup lang="ts">
import type { Corporation } from '~~/composables/corporations/useCorporations';
import type { NftFragment } from '#gql'

import NewLandsGif from '~/assets/images/ui/task-manager/new-lands-order-image.gif'
import EternalabGif from '~/assets/images/ui/task-manager/eternalab-order-image.gif'

const { getNftTokenKey } = useNFTs()

const imagePath = computed(() => {
  const config = useRuntimeConfig()

  switch (props.corporation) {
    case 'eternalab': return EternalabGif
    case 'new-lands': return NewLandsGif
    case 'gws': return config.public.s3 + '/nft/images/astro-credit/icon.png'
  }
})

const props = defineProps<{
  token?: NftFragment
  tokens?: NftFragment[]
  corporation?: Corporation,
  isSelected?: boolean,
  isButtonDisabled?: boolean,
  isActive?: boolean,
  noSelect?: boolean
  canClaim?: boolean
  accentedHover?: boolean,
}>()

</script>