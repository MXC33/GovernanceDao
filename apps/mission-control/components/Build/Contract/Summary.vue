<template lang="pug">
InfoSummary()
  template(#header) {{ $t(`general.summary`) }}

  InfoSummaryRow()
    template(#left) {{$t(`tiles.active-tiles`)}}
    template(#right v-if="hasStakedGenesis") {{ $t(`tiles.free`) }}
    template(#right v-else) {{activeTiles}}/{{ totalTiles }}

  InfoSummaryRow()
    template(#left) {{ $t(`tiles.rent-cost`) }}
    template(#right v-if="hasStakedGenesis") {{ $t(`tiles.free`) }}
    template(#right v-else) {{ cost }}

  InfoSummaryRow()
    template(#left) {{ $t(`tiles.total-cost`) }}
    template(#right v-if="hasStakedGenesis") {{ $t(`tiles.free`) }}
    template(#right v-else) {{ totalCost }}

</template>

<script setup lang="ts">
import { spaceCaseIt } from 'case-it';
import type { TileContract } from '~~/composables/useTileContract'
import type { NftFragment } from '#gql'

const props = defineProps<{
  contract: TileContract
}>()

const { tileGroupsInRing, getActiveRentCount } = useTiles()
const { tileCountInRing } = useTileRings()
const balanceOfStakedToken = useStakedCorporationGenesis("new-lands")

const hasStakedGenesis = computed(() =>
  balanceOfStakedToken.value > 0
)

const totalTiles = computed(() => tileCountInRing(props.contract.ring))
const isFree = computed(() => props.contract.costPerTile.price == 0)

const cost = computed(() => {
  if (isFree.value)
    return 'FREE'
  const { costPerTile: { price } } = props.contract
  return `${price} ${priceName.value}/TILE`
})

const priceName = computed(() =>
  spaceCaseIt(props.contract.costPerTile.token?.tokenInfo?.type ?? "")
)

const rentedTileCount = computed(() =>
  getActiveRentCount(tileGroupsInRing(props.contract.ring))
)

const activeTiles = computed(() => {
  return isFree.value ? totalTiles.value : rentedTileCount.value
})

const totalCost = computed(() => {
  if (isFree.value)
    return 'FREE'
  const { costPerTile: { price } } = props.contract
  return `${activeTiles.value * price} ${priceName.value}/${periodText.value}`
})

const periodText = computed(() => {
  switch (props.contract.payInterval) {
    case 'monthly':
      return 'month'
    default:
      return ''
  }
})



</script>