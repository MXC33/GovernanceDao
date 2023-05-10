<template lang="pug">
HList(space-x="1")
  div() {{ balance }} 
  TokenName(:token="token" v-if="withName" :is-short="true" w="auto")
</template>

<script lang="ts" setup>
import type { TokenIdentifier } from '~~/composables/Token/useTokens';
const { balanceOfToken } = useUserData()

const props = defineProps<{
  token: TokenIdentifier,
  withName?: boolean
}>()

const balance = computed(() =>
  balanceOfToken(props.token)
)


</script>
