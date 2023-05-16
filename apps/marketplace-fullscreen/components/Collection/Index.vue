<template lang="pug">
VList(flex-grow="1" min-h="0" pos="relative" p="6" space-y="6")
  CollectionHeader() 
    template(#header) 
      slot(name="name")

    template(#attributes)
      slot(name="attributes")

  CollectionFilter()

  Transition(name="fade" mode="out-in")
    div(grid="~ cols-2 md:cols-3 lg:cols-4 2xl:cols-5" divide-x="0.5" v-if="displayType == 'grid'")
      CollectionGridItem(:token="token" v-for="token in items" b="gray-400")

    CollectionTable(:columns="columns" :rows="items" initial-sort="tier" v-else)
      template(#item-asset="{row}")
        HList(items="center" space-x="2" font="bold")
          div(w="12" h="12")
            TokenImage(:token="row" w="12" h="12" :key="row.id")
          TokenName(:token="row" capitalize="~")

</template>

<script lang="ts" setup>
import type { CollectionItem } from '~/composables/useCollection';
import type { TableColumn } from '~/composables/useTable'
const { displayType } = useCollectionSettings()

const columns: TableColumn[] = [
  { label: "Asset", value: "asset", width: 100 },
  { label: "Type", value: "type", sortable: true },
  { label: "Tier", value: "tier", sortable: true },
]

defineProps<{
  items: CollectionItem[]
}>()

</script>