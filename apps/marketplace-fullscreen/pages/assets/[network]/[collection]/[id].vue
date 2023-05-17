<template lang="pug">
CollectionHeaderWrapper
div(flex-grow="1" space-y="12" px="8")
  div(grid="~ md:cols-3" grid-auto-flow="row" gap="d md:8")
    div(order="1")
      CollectionItemMedia

    div(grid="md:col-span-2" order="2" row="span-3")
      CollectionItemCollapsable(class="basis-1 md:basis-2/3" :title="'Sales'")
        template(#icon)
          Plus
        p ajhsdjkash askjdhas kdjaskh asjkhdka adddddddsss
      CollectionItemCollapsable(class="basis-1 md:basis-2/3" :title="'Listings'")
        template(#icon)
          Plus
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka
        p ajhsdjkash askjdhas kdjaskh asjkhdka


    div(order="3")
      CollectionItemCollapsable(:title="'Description'")
        p() A symbol carried by Agents of Change who embraced early relationships with Newlands LLC. The go-to vendor for advanced architecture and infrastructure on Planet IX. The Newlands Genesis is the embodiment of industry, and holders are eternally rewarded with assets and designs from the corporation.
        template(#icon)
          Bars


      //CollectionItemCollapsable(class="basis-1 md:basis-2/3" :title="'treits desktop'")
      //  template(#icon)
      //    Plus
      //  CollectionItemTreit(type="Collection1" name="Newlands1" value="0.1")
      //  CollectionItemTreit(type="Collection2" name="Newlands2" value="0.2")
      //  CollectionItemTreit(type="Collection3" name="Newlands3" value="0.3")


</template>


<script lang="ts" setup>
import Plus from '~/assets/icons/plus.svg'
import Bars from '~/assets/icons/bars.svg'
import Layers from '~/assets/icons/layers.svg'
import ListUl from '~/assets/icons/list-ul.svg'

const isMobile = false

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