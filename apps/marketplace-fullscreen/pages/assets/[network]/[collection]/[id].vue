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
import { CollectionItem } from '~/composables/useCollection';


const { allTokens, fetchUserInventory } = useUserData()
await fetchUserInventory()

definePageMeta({
  middleware: 'auth'
})


const rows = computed<CollectionItem[]>(() =>
  allTokens.value.map((token) => token as CollectionItem)
)


</script>