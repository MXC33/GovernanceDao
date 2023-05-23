<template lang="pug">
Popup()
  Transfer(:token="data.nfts[randomIndex]")

VList(flex-grow="1" min-h="0" pos="relative" p="8" space-y="6")
  CollectionHeader(:collection="data" v-if="data" )
    template(#header) {{ data.name }}

    template(#attributes)
      AttributeList(:data="data" v-if="data" )

  CollectionFilter(:items="data.nfts" :filters="data.filters" v-if="data"  @toggle-filter="toggleFilterDrawer")

  HList(pos="sticky")
    Transition(name="slide-left")
      ContentDrawerWrapper(v-if="showFilters && data" pos="sticky top-58" h="100" inset="0" :items="data.filters")

    Transition(name="fade" mode="out-in" v-if="data")
      CollectionGrid(v-if="displayType == 'grid'" w="full")
        CollectionGridItem(:token="token" v-for="token in data.nfts" b="gray-400")

      CollectionTable(:columns="columns" :rows="data.nfts" v-else initial-sort="name")
        template(#item-name="{row}")
          HList(items="center" space-x="2" font="bold")
            div(w="12" h="12")
              TokenImage(:token="row" w="12" h="12" :key="getTokenKey(row)")
            TokenName(:token="row" capitalize="~" :key="getTokenKey(row)")

  Transition(name="slide-bottom")
    CollectionSelectBar(v-if="cartItems.length > 0")
</template>

<script lang="ts" setup>
import type { CollectionData } from '~/composables/useCollection';
import type { TableColumn } from '~/composables/useTable'
const { displayType } = useCollectionSettings()
const { getTokenKey } = useTokens()
const { cartItems } = useCart()
const columns: TableColumn[] = [
  { label: "Asset", value: "name" },
  { label: "Higher bid price", value: "higher_bid_price", sortable: true },
  { label: "Sale Price", value: "sale_price", sortable: true },
]

const showFilters = ref(false)

const toggleFilterDrawer = () => {
  showFilters.value = !showFilters.value
}

const { data } = defineProps<{
  data: CollectionData,
}>()

const randomIndex = Math.floor(Math.random() * data.nfts.length)

</script>