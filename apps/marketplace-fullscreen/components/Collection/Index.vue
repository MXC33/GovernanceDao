<template lang="pug">
VList(flex-grow="1" min-h="0" pos="relative" p="8" space-y="6")
  CollectionHeader() 
    template(#header) 
      slot(name="name")

    template(#attributes)
      AttributeList(:attributes="attributes" v-if="data")

  CollectionFilter(:items="data.nfts" :filters="data.filters" v-if="data"  @toggle-filter="toggleFilterDrawer")

  HList(pos="sticky")
    Transition(name="slide-left")
      ContentDrawerWrapper(:items="data.filters" v-if="showFilters && data")
      //- CollectionFilterWrapper(v-if="showFilters && data" pos="sticky top-58" h="100" inset="0" :items="data.filters")
      //-   template(#default)

      //-     ContentDrawer()
      //-       template(#header) 
      //-         VList(w="full")
      //-           InputRadio()
      //-             template(#default)
      //-             template(#value) 


        //- ContentDrawer()
        //-   template(#header) 
        //-   template(#default)
        //-     VList(w="full")
        //-       InputCheckbox()
        //-         template(#default) 
        //-         template(#value) 


    Transition(name="fade" mode="out-in" v-if="data")
      CollectionGrid(v-if="displayType == 'grid'" w="full")
        CollectionGridItem.collection-grid-item(:token="token" v-for="token in data.nfts" b="gray-400")

      Table(:columns="columns" :rows="data.nfts" v-else initial-sort="name")
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
import type { APIFilter } from '~/composables/useCollection'
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

// const filterRadio = ref<boolean[]>([])
// const filterCheckbox = ref<boolean[]>([])

// watch(filterRadio, (newValue, oldValue) => {
//   console.log(`filterRadio changed from ${oldValue} to ${newValue}`)
// })
// watch(filterCheckbox, (newValue, oldValue) => {
//   console.log(`filterCheckbox changed from ${oldValue} to ${newValue}`)
// })


</script>

<style>
.collection-grid-item:nth-child(5n + 6) {
  border: 0px;
}
</style>