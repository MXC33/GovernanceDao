<template lang="pug">
FoldList(from="col" b="1 on-active:mc-mint white opacity-20" cursor="pointer" justify="center" items="center" :active="isActive" cut="bottom-right s-lg on-active:b-mc-mint b-white b-opacity-20 on-invalid:b-mc-orange" color="" aspect="4/5" w="50%" bg="on-active:(black opacity-20) on-video:black" :video="displayVideo" :invalid="isInvalid")

  div(aspect="square" w="full" p="4 md:8")
    div(pos="relative" w="full" h="full")
      TokenVideo(:token="token" v-if="displayVideo" w="full" h="full" :is-large="true" pos="absolute" inset="0")
      TokenImage(:token="token" v-else w="full" h="full"  pos="absolute" inset="0" :is-large="true")

  VList(justify="center" items="center" w="full" flex-grow="1" font="bold" color="on-invalid:mc-orange white on-active:mc-mint" :invalid="isInvalid" :active="isActive" text="center")
    slot

</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql'

const displayVideo = computed(() => {
  switch (props.token.tokenInfo.type) {
    case 'pix':
    case 'astro-gold':
    case 'astro-gold-lite':
      return false
    default:
      return true
  }
})

const props = defineProps<{
  token: NftFragment,
  isInvalid?: boolean,
  isActive?: boolean,
}>()

</script>