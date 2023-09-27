<template lang="pug">
HList(items="center" font="bold" space-x="2" color="$mc-accent")
  TokenIcon(:token="token" w="8")
  div {{ amount }}
  TokenName(:token="token" :is-short="true")

</template>
    
<script lang="ts" setup>
import type { NftFragment } from '#gql'

const { token, amount } = defineProps<{
  token: NftFragment,
  amount: number
}>()


</script>