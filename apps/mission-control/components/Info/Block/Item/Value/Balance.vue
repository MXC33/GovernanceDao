<template lang="pug">
span(color="s-active:$mc-accent s-disable:gray_light" :state="state") {{ balance }}

</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql'
import type { InfoBlockItemBalance } from '~~/composables/useInfoBlocks'

const { token } = defineProps<{
  item: InfoBlockItemBalance,
  token: NftFragment
}>()

const { balanceOfToken } = useUserData()
const { ixtPrice } = useIXTPrice()
const balance = computed(() => {
  if (!token)
    return 0

  const { tokenInfo: { type, tier } } = token
  const balanceOfStakedToken = useStakedDataBalance(type, tier)
  return balanceOfToken(token) + balanceOfStakedToken.value
})

const state = computed(() => balance.value > 0 ? 'active' : null)



</script>