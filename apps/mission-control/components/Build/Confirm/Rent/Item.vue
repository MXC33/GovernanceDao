<template lang="pug">
TokenProposal(:token="token" :can-select="!outOfBalance" :not-available="outOfBalance" :is-active="isActive")

  HList(justify="center" space-x="2" font="normal" mt="1" color="on-unavailable:mc-orange" :unavailable="outOfBalance")
    div Balance:
    div {{ balance }}
    TokenName(:token="token" :is-short="true")

</template>

<script setup lang="ts">
import type { NftFragment } from '#gql'

const { balanceOfToken } = useUserData()
const balance = computed(() => balanceOfToken(props.token))
const outOfBalance = computed(() => balance.value == 0)

const props = defineProps<{
  token: NftFragment,
  isActive: boolean
}>()
</script>
