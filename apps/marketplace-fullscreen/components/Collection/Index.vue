<template lang="pug">
VList(flex-grow="1" min-h="0" pos="relative" p="6" space-y="6")
  CollectionHeader(:collection="data" v-if="data" )
    template(#header) {{ data.name }}

    template(#attributes)
      HList(space-x="3" h="full")
        VList()
        sds


    slot()

  CollectionFilter(:items="data.filters" v-if="data" )

  Transition(name="fade" mode="out-in" v-if="data")
    CollectionGrid(v-if="displayType == 'grid'")
      CollectionGridItem(:token="token" v-for="token in data.nfts" b="gray-400")

    CollectionTable(:columns="columns" :rows="data.nfts" v-else initial-sort="tier" )
      template(#item-asset="{row}")
        HList(items="center" space-x="2" font="bold")
          div(w="12" h="12")
            TokenImage(:token="row" w="12" h="12" :key="row.id")
          TokenName(:token="row" capitalize="~")

</template>

<script lang="ts" setup>
import type { CollectionData } from '~/composables/useCollection';
import type { TableColumn } from '~/composables/useTable'
const { displayType } = useCollectionSettings()

const columns: TableColumn[] = [
  { label: "Asset", value: "asset", width: 100 },
  { label: "Type", value: "type", sortable: true },
  { label: "Tier", value: "tier", sortable: true },
]

defineProps<{
  data: CollectionData
}>()

</script>