<template lang="pug">
div(pos="relative" h="full" w="full" pointer-events="none")  
  TokenSlideshow(:tokens="block.items" h="100" corners="~ lg accent" :image="block.forceImage")

</template>
    
<script lang="ts" setup>
import type { InfoBlockSlideshow } from '~~/composables/useInfoBlocks';
import type { NftFragment } from '#gql'

const props = defineProps<{
  block: InfoBlockSlideshow,
  token: NftFragment
}>()



</script>