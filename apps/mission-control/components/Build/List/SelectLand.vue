<template lang="pug">
ListContainer(:is-loading="pending" pt="4")
  ListSection(v-if="items.length > 0")
    BuildItemLand(:item="item" :is-placeable="true" v-for="item in items")
  ListSection(v-else)
    div {{$t(`general.noItemsFound.noFull`)}}
    
</template>

<script setup lang="ts">
import type { PixTier, LandType } from '~~/composables/NFTs/useLand';
const { buildSelectionGroup } = useBuildTools()

const refresh = () => refreshNuxtData('select-land')
const { isLandStakedOnTiles } = useTiles()
const fetchUniqueLand = useFetchUniqueLand()

const { data: landItems, pending } = await useAsyncData('select-land', () => {
  return fetchUniqueLand(buildSelectionGroup.value.tokenInfo.tier as PixTier, buildSelectionGroup.value.tokenInfo.type as LandType)
})

const items = computed(() => {
  const items = landItems.value?.items ?? []
  return items.filter((item) => !isLandStakedOnTiles(item?.tokenId ?? item.tokenInfo.title))
})

watch(buildSelectionGroup, () => {
  refresh()
}, { immediate: true })

</script>