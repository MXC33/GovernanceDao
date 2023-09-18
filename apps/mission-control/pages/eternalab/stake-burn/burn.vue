<template lang="pug">
CorporationBurn(:available-tokens="allAvatars")
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  layout: 'corporation'
})

const { execute: fetchAvatars, data: allAvatars } = useAvatarNFTData()
const { execute: fetchTokens } = useTokenData()

await Promise.all([
  fetchAvatars(),
  fetchTokens(),
])


</script>