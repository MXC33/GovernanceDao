<template lang="pug">
template(v-for="tile in sortedTileGroupsOnTileNameNumber")
  div(v-if="activeTileRing(tile)")
    OverviewListRing(:tile-group="tile") {{ tile.tileName }}

</template>
<script setup lang="ts">
import type { TileGroup } from '~~/composables/useTiles';

const { activeTab } = useOverview()

const { tileGroups } = useTileData()

const sortedTileGroupsOnTileNameNumber = computed(() => {
  return tileGroups.value.sort((a, b) => {
    const nameA = a.tileName
    const nameB = b.tileName

    const numA = parseInt(nameA.slice(1), 10)
    const numB = parseInt(nameB.slice(1), 10)

    return numA - numB
  })
})

const activeTileRing = (tileGroup: TileGroup) => {
  if (activeTab.value == 'district-a')
    return ['A'].includes(tileGroup?.ring)
  if (activeTab.value == 'district-b')
    return ['B'].includes(tileGroup?.ring)
  if (activeTab.value == 'district-c')
    return ['C1', 'C2'].includes(tileGroup?.ring)
}
</script>