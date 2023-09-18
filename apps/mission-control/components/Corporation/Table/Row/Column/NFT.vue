<template lang="pug">
div(b="1 r-none $mc-accent-40" aspect="1" flex="~" justify="center" h="[calc(100%+2px)]")
  TokenImage(:token="token" w="10")
</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql'



defineProps<{
  token: NftFragment
}>()
</script>
