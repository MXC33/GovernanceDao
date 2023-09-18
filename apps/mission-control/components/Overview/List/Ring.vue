<template lang="pug">
ListSection(@mouseenter="hoverTile" ref="element" @click="selectTile" :title="`Tile ${name}`" :is-selected="isSelected")

  template(#default)
    OverviewItemLand.list-header-no-stroke(:item="tileGroup.land" @remove-item="onClickRemoveLand" :is-selected="isSelected" :id="tileToId(tileGroup.tile)" v-if="tileGroup.land")

    OverviewItemTech.list-header-no-stroke(v-for="item in wasteNFT" :item="item" v-if="wasteNFT" :is-nft-active="true" :is-selected="isSelected" @remove-item="onClickRemoveAsset(item)")

    OverviewItemFacility.list-header-no-stroke(v-for="item in facility" :item="item" :tile-group="tileGroup" v-if="facility" :is-nft-active="true" @remove-item="onClickRemoveAsset(item)")

  template(#details)
    OverviewSummary(v-if="tileGroup.land" :tile="tileGroup")
</template>

<script setup lang="ts">

import type { TileAsset, TileGroup } from '~~/composables/useTiles';
const { selectedTile, isTileSelected, tileToId } = useTileSelection()
const { proposeRemoveNFT } = useStakeNFTFlow()
const { getTileName } = useTiles()
const element = ref()

const props = defineProps<{
  tileGroup: TileGroup
}>()

const name = computed(() => getTileName(props.tileGroup.tile))

const isSelected = computed(() => isTileSelected(props.tileGroup?.tile))

watch(isSelected, (selected) => {
  if (selected) {
    nextTick(() => {
      element.value?.$el?.scrollIntoView()
    })
  }
}, { immediate: true })

const selectTile = () => {
  selectedTile.value = props.tileGroup?.tile

}

const hoverTile = () => {
  const { hoverTile } = useGameInterface()
  const { tile } = props.tileGroup
  hoverTile(tile)
}

const wasteNFT = computed(() =>
  props.tileGroup?.assets?.some(item => item.tokenInfo.type == 'drone' || item.tokenInfo.type == 'rover') ? props.tileGroup.assets : null
)

const facility = computed(() =>
  props.tileGroup?.assets?.some(item => item.tokenInfo.type == 'facility') ? props.tileGroup.assets : null
)

const onClickRemoveLand = () => {
  const amount = props.tileGroup.assets ? props.tileGroup.assets.length + 1 : 1
  proposeRemoveNFT(props.tileGroup, amount, 0)

}
const onClickRemoveAsset = (asset: TileAsset) => {
  proposeRemoveNFT(props.tileGroup, 1, asset.index)

}

</script>

<style>
.list-header-no-stroke svg path {
  stroke: none;
}

.list-header-white svg path {
  stroke: white;
}
</style>