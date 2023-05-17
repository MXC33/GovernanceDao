<template lang="pug">
CollectionHeaderWrapper
div(flex-grow="1" space-y="12" px="8")
  div(class="flex gap-4")
    div(class="basis-1 md:basis-1/3 order-1")
      CollectionItemMedia
      template(v-if="!isMobile")
        CollectionItemCollapsable(class="basis-1 md:basis-2/3" :title="'Description desktop'")
          p ajhsdjkash askjdhas kdjaskh asjkhdka
          template(#icon)
            Plus
        CollectionItemCollapsable(class="basis-1 md:basis-2/3" :title="'treits desktop'")
          template(#icon)
            Plus
          CollectionItemTreit(type="Collection1" name="Newlands1" value="0.1")
          CollectionItemTreit(type="Collection2" name="Newlands2" value="0.2")
          CollectionItemTreit(type="Collection3" name="Newlands3" value="0.3")
    div(class="basis-1 md:basis-2/3 grow order-2 w-100")
      CollectionItemCollapsable(class="basis-1 md:basis-2/3" :title="'Sales'")
        template(#icon)
          Plus
        p ajhsdjkash askjdhas kdjaskh asjkhdka
      CollectionItemCollapsable(class="basis-1 md:basis-2/3" :title="'Listings'")
        template(#icon)
          Plus
        p ajhsdjkash askjdhas kdjaskh asjkhdka
      template(v-if="isMobile")
        CollectionItemCollapsable(class="basis-1 md:basis-2/3" :title="'Description desktop'")
          template(#icon)
            Plus
          p ajhsdjkash askjdhas kdjaskh asjkhdka
        CollectionItemCollapsable(class="basis-1 md:basis-2/3" :title="'treits desktop'")
          template(#icon)
            Plus
          CollectionItemTreit(type="Collection1" name="Newlands1" value="0.1")
          CollectionItemTreit(type="Collection2" name="Newlands2" value="0.2")
          CollectionItemTreit(type="Collection3" name="Newlands3" value="0.3")
</template>


<script lang="ts" setup>
import Plus from '~/assets/icons/plus.svg'
import {useNFT} from "~/composables/states/useNFT";
const isMobile = false

const route = useRoute()

const useNft = useNFT().getNFT({
  slug: route.params.slug.toString(),
  network: route.params.network.toString(),
  collection: route.params.collection.toString(),
  token_id: +route.params.id || 0,
  user_id: 16
})
console.log('fisky ', useNft)

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