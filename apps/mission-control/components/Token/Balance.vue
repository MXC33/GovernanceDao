<template lang="pug">
HList(space-x="1")
  div() {{ balance }} 
  TokenName(:token="token" v-if="withName" :is-short="true" w="auto")
</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql'
const { balanceOfToken } = useUserData()

const props = defineProps<{
  token: NftFragment,
  withName?: boolean
}>()

const balance = computed(() =>
  balanceOfToken(props.token)
)


</script>
