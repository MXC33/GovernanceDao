<template lang="pug">
VList(flex-grow="1" min-h="0" pos="relative" p="8" space-y="6")
  CollectionHeader(:collection="data" v-if="data" )
    template(#header) {{ data.name }}

    template(#attributes)
      ATtributeList()

  CollectionFilter(:items="items" @toggle-filter="toggleFilterDrawer" pos="relative")

  HList(pos="sticky")
    Transition(name="slide-left")
      ContentDrawerWrapper(v-if="showFilters" pos="sticky top-58" h="100" inset="0")

    Transition(name="fade" mode="out-in")

      CollectionGrid(v-if="displayType == 'grid'")
        CollectionGridItem(:token="token" v-for="token in items" b="gray-400")

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

const { y } = useWindowScroll()

const valueTop = computed(() => {
  const yValue = y.value + 100

  return yValue.toString()
})

console.log(valueTop.value)
// `sticky top-${valueTop}`

const showFilters = ref(false)

const toggleFilterDrawer = () => {
  showFilters.value = !showFilters.value
}

defineProps<{
  data: CollectionData
}>()

</script>