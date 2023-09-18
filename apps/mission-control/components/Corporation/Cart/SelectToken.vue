<template lang="pug">
div(grid="~ cols-2")
  HList(v-for="token in availableTokens" @click="selectToken(token)" items="center" p="1" justify="center" bg="$mc-accent-20 hover:$mc-accent-40 on-active:$mc-accent-60" transition="all" cursor="pointer" :active="isSameNFT(token, activeToken?.token)")
    TokenIcon(:token="token" w="7" :outline="true")

</template>

<script lang="ts" setup>
import type { CorporationPaymentToken } from '~~/composables/corporations/useCorporations';
import type { NftFragment } from '#gql'

const { isSameNFT } = useNFTs()

const selectToken = (newToken: NftFragment) => {
  activeToken.value = {
    ...activeToken.value,
    token: newToken
  }
}

defineProps<{
  availableTokens: NftFragment[]
}>()

const activeToken = defineModel<CorporationPaymentToken>()

</script>