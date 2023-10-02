<template lang="pug">
div(space-y="4")
  BuildListSearch()

  ListSection(:title="group.name" v-for="group in groupedLand" v-if="groupedLand.length > 0")
    BuildItemLandGroup(:item="item" v-for="item in group.items", @click="selectItem(item)")

  ListEmpty(type="land" v-else)
</template>

<script setup lang="ts">
import type { NftFragment } from '#gql'

const { data: landData, pending: fetchingLand } = useLandData()
const { selectGroup } = useBuildTools()

const groupedLand = computed(() => categorizeNFTs(landData.value))
const selectItem = (token: NftFragment) => {
  selectGroup(token)
}
</script>