<template lang="pug">
Collection(:items="rows")

</template>


<script lang="ts" setup>
import type { CollectionItem } from '~/composables/useCollection';

const { allTokens, fetchUserInventory } = useUserData()
await fetchUserInventory()

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const { collection, network } = route.params

const { data: collections, execute: fetchAllCollections } = useCollectionsData()

const { data: items, execute: fetchCollection } = useCollectionData(String(collection))

onMounted(() => {
  fetchAllCollections()
  fetchCollection()
})

console.log("DATA", items.value, collections.value)

const rows = computed<CollectionItem[]>(() =>
  (items.value ?? []).map((item) => item.token as CollectionItem)
)

</script>