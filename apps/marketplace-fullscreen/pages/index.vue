<template lang="pug">
CollectionHeaderWrapper()
  template(#header) Planet IX - Assets
  template(#attributes)
    Attribute

VList(flex-grow="1" min-h="0" pos="relative" p="6" space-y="6")
  h1(text="3xl" font="bold") MY ASSETS

  CollectionHeader()
  HList(space-x="3" h="full")
    VList()

  Transition(name="fade" mode="out-in")
    div(grid="~ cols-2 md:cols-3 lg:cols-4 2xl:cols-5" divide-x="0.5" v-if="displayType == 'grid'")
      GridItem(:token="token" v-for="token in allTokens" b="gray-400")

    VTable(:columns="columns" :rows="rows" initial-sort="tier" v-else)
      template(#item-asset="{row}")
        HList(items="center" space-x="2" font="bold")
          TokenImage(:token="row" w="12")
          TokenName(:token="row" capitalize="~")

</template>


<script lang="ts" setup>
import type { CollectionItem } from '~/composables/useCollection';
import type { TableColumn } from '~/composables/useTable';

const { allTokens, fetchUserInventory } = useUserData()
const { displayType } = useCollectionSettings()
await fetchUserInventory()

definePageMeta({
  middleware: 'auth'
})

const columns: TableColumn[] = [
  { label: "Asset", value: "asset" },
  { label: "Type", value: "type", sortable: true },
  { label: "Tier", value: "tier", sortable: true },
]


const rows = computed<CollectionItem[]>(() =>
  allTokens.value.map((token) => token as CollectionItem)
)

</script>