<template lang="pug">
Collection(:items="rows" v-if="rows")
  template(#name) My Assets
  template(#attributes) 
    AttributeList()

</template>


<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';


const { allTokens, fetchUserInventory } = useUserData()
await fetchUserInventory()
const { getTokenKey } = useTokens()

const rows = computed<IXToken[]>(() =>
  allTokens.value.map((token) => ({
    ...token,
    id: getTokenKey(token, '-', true)
  }))
)

</script>