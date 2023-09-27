<template lang="pug">
CorporationTableRowContainer()
  template(#icon)
    TokenImage(v-if="corporation == 'gws'" :token="waste"  b="1 r-none $mc-accent-40" h="full")
    img(v-else :src="imagePath" b="1 r-none $mc-accent-40" h="full")

  template(#left)
    HelperTimeLeft(:finishTime="finishTime" text="$corporation-text-color" b="1 $mc-accent-40" w="full" align="center" items="center" flex="~" p="l-2")

  template(#right)
    CorporationTableRowColumn(justify="center")
      p {{ orderAmount }}

</template>
  
<script lang="ts" setup>
import type { OrderFragment } from '#gql';
import NewLandsGif from '~/assets/images/ui/task-manager/new-lands-order-image.gif'
import EternalabGif from '~/assets/images/ui/task-manager/eternalab-order-image.gif'
import type { NftFragment } from '#gql'
const { orderFinishTime } = useCorporationOrders()
const { corporation } = useCorporations()
const { public: config } = useRuntimeConfig()
const { addCacheKey } = useCacheKey()

const waste: NftFragment = { type: 'waste' }

const props = defineProps<{
  orderItem: OrderFragment
}>()

const finishTime = computed(() => orderFinishTime(props.orderItem) ?? 0)
const orderAmount = computed(() => props.orderItem.orderAmount ?? 0)
// console.log("FinishTime: ", finishTime.value, props.orderItem)

const imagePath = computed(() => {
  switch (corporation.value) {
    case 'eternalab': return EternalabGif
    case 'new-lands': return NewLandsGif
    case 'gws': return addCacheKey(config.s3 + '/nft/images/astro-credit/icon.png')
  }
})
</script>