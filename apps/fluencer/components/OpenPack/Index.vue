<template lang="pug">
VList(w="full" pos="fixed" inset="0" z="999" bg="mc-black" p="3" flex-center="col")

  OpenPackStarsBackground(z="-1" pos="absolute" :speed="0.3" :token="pack.token")

  VList(max-w="160" w="full" space-y="2" min-h="0")
    VList(pos="relative" align="center" min-h="0" justify="center")
      OpenPackStarsShade(opacity="100")

      TokenImage(:token="pack.token" :key="getNftTokenKey(pack.token)" :is-large="true" pos="relative"  mx="auto" w="full" min-h="0" mix-blend="lighten")

    HList(pos="relative" b="1 mc-orange opacity-40" p="2" bg="mc-black opacity-60" backdrop="blur-md")
      TokenName(:token="pack.token" flex-grow="1")
      div x{{ pack.amount }}

    div(grid="~ cols-3 gap-2")
      div 

      button(cut="bottom-right b-$mc-mint" bg="hover:$mc-mint-10" btn="~ secondary-outline" @click="closeChest" backdrop="blur-md") {{$t(`general.close`)}}

      button(sound="sm" cut="bottom-right b-$mc-mint"  btn="~ primary" @click="onClickOpen" backdrop="blur-md") {{$t(`general.confirm`)}}

</template>

<script setup lang="ts">
const props = defineProps<{
  tokenId: string
}>()
</script>
