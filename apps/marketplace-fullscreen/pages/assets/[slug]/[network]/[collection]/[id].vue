<template lang="pug">
Collection(:items="rows")
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

</template>


<script lang="ts" setup>
import Plus from '~/assets/icons/plus.svg'
import Bars from '~/assets/icons/bars.svg'
import Layers from '~/assets/icons/layers.svg'
import ListUl from '~/assets/icons/list-ul.svg'
import { CollectionItem } from '~/composables/useCollection';

const isMobile = false

const { allTokens, fetchUserInventory } = useUserData()
const { displayType } = useCollectionSettings()
await fetchUserInventory()

definePageMeta({
  middleware: 'auth'
})


const rows = computed<CollectionItem[]>(() =>
  allTokens.value.map((token) => token as CollectionItem)
)


</script>