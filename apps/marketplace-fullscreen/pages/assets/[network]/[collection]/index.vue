<template lang="pug">
Collection(:data="data")

</template>


<script lang="ts" setup>
import type { CollectionData } from '~/composables/useCollection';

const { allTokens, fetchUserInventory } = useUserData()
await fetchUserInventory()

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const { collection, network } = route.params


const { data: collectionData, execute: fetchCollection } = useCollectionData(String(collection))

onMounted(async () => {
  await fetchCollection()
})


const data = computed<CollectionData>(() => (collectionData.value as CollectionData))

</script>