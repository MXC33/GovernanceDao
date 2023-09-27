<template lang="pug">
HList(v-if="token.tokenInfo.type == 'astro-gold-lite' && balance == 0" )
HList(v-else items="center" space-x="2" font="bold" b="1 $mc-accent-40" p="4")
  TokenImage(:token="token" w="8")



  HList(items="center" justify="between" w="full" text="md")
    TokenName(:token="token" color="$mc-accent" w="full")
    div() {{ balance }}
</template>
    
<script lang="ts" setup>
import type { NftFragment } from '#gql'
const { balanceOfToken } = useUserData()

const balance = computed(() => balanceOfToken(token))
const { token } = defineProps<{
  token: NftFragment
}>()

</script>