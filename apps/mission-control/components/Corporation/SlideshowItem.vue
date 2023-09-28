<template lang="pug">
div(bg="black" w="full" h="full" pos="absolute")
  TokenVideo(:token="token" transition="all" autoplay="false" w="full" h="full" pos="absolute" object="contain center" loop playsinline muted)
</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql'

defineProps<{
  token: NftFragment
}>()

</script>

