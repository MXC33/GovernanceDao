<template lang="pug">

//-z="99" pos="absolute top-0 left-0" 

VList(flex-grow="1" min-h="0" pos="relative" p="8" space-y="6")
  CollectionHeader() 
    template(#header) 
      slot(name="name")

    template(#attributes)
      AttributeList(:attributes="attributes" v-if="data")

  CollectionFilter(:items="data.nfts" :filters="data.filters" v-if="data"  @toggle-filter="toggleFilterDrawer")

  HList(space-x="3")
    Transition(name="slide-left")
      CollectionFilterSlideout(:items="data.filters" v-if="showFilters && data" pos="sticky top-22")

    Transition(name="fade" mode="out-in" v-if="data")
      CollectionGrid(v-if="displayType == 'grid'" w="full")
        CollectionGridItem.collection-grid-item(:token="token" v-for="token in data.nfts" b="gray-400")

      Table(:columns="columns" :rows="data.nfts" v-else id="collection")
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
import type { IXToken } from '@ix/base/composables/Token/useIXToken';

const { displayType } = useCollectionSettings()
const { getTokenKey } = useTokens()
const { cartItems } = useCart()


const { getCollectionAttributes } = useDefaulAttributes()
const attributes = computed(() => getCollectionAttributes(data))

const columns: TableColumn<IXToken>[] = [
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

</script>

<style>
.collection-grid-item:nth-child(5n + 6) {
  border: 0px;
}
</style>