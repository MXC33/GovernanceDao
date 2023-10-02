<template lang="pug">
VList(space-y="2" v-if="properties")
  InfoHeader(color="white") {{$t(`inventory.info.properties`)}}

  div(grid="~ cols-2 xl:cols-3 gap-2 auto-rows-fr")
    InfoAttribute( v-for="item in properties")
      template(#header) {{ item.traitType }} 
      template(#default)
        span(color="mc-accent") {{ item.value }}

</template>

<script setup lang="ts">
import type { NftFragment } from '#gql'

const props = defineProps<{
  token: NftFragment
}>()


const properties = computed(() => {
  return props.token.tokenInfo.attributes
})
</script>
