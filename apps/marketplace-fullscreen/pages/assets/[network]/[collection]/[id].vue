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
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import Plus from '~/assets/icons/plus.svg'


const { allTokens, fetchUserInventory } = useUserData()
await fetchUserInventory()

const rows = computed<IXToken[]>(() =>
  allTokens.value.map((token) => token as IXToken)
)


</script>