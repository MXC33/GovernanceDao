<template lang="pug">
Icon(:filter="outline ? 'url(#white-outline)' : ''")
</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql'
const { getTokenTier } = useNFTs()

const svgPath = computed(() => getTokenTier(props.token))
console.log("PATH", svgPath.value)
const Icon = await import(`../../assets/images/ui/token/${svgPath.value}.svg?component`).catch(() => '<div></div>')

const props = defineProps<{
  token: NftFragment,
  outline?: boolean
}>()

</script>