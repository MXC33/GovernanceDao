<template lang="pug">
VList(w="full" bg="mc-black opacity-80" pos="sticky bottom-0" backdrop="blur-md")
  ButtonSound(v-if="canClaim" @click="onClickClaim" btn="~ primary-outline lg on-not-claimable:disable" sound="sm" uppercase="~" w="full") {{ $t(`taskManager.claimAll`) }}


</template>

<script setup lang="ts">
import type { NftFragment } from '#gql'
import type { CorporationOrderId } from '~/composables/corporations/order/defineOrderContract';

const { canClaimAllProduction, canClaimAllOrders } = useTaskManager()

const { collectFromAllTiles } = useStakeNFTContracts()
const { claimBatchOrder } = useOrderContracts()
const canClaim = computed(() => {
  if (props.type == 'orders')
    return canClaimAllOrders.value
  else
    return canClaimAllProduction(props.token?.tokenInfo?.type)
})

const onClickClaim = () => {
  if (props.type == 'orders' && props.orderId)
    return claimBatchOrder(props.orderId)

  return collectFromAllTiles(props.token)
}

const props = defineProps<{
  token?: NftFragment,
  orderId?: CorporationOrderId
  type: 'production' | 'orders'
}>()

</script>
