<template lang="pug">
Collection(:items="rows" v-if="rows")
  template(#name) My Assets
  template(#attributes) 
    AttributeList()

</template>


<script lang="ts" setup>
import type { CollectionItem } from '~/composables/useCollection';

const { allTokens, fetchUserInventory } = useUserData()
await fetchUserInventory()
const { getTokenKey } = useTokens()

definePageMeta({
  middleware: 'auth'
})

const rows = computed<CollectionItem[]>(() =>
  allTokens.value.map((token) => ({
    ...token,
    id: getTokenKey(token, '-', true)
  }))
)

</script>