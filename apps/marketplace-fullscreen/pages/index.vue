<template lang="pug">
Attribute

VList(flex-grow="1" min-h="0" pos="relative" p="6" space-y="6")
  h1(text="3xl" font="bold") MY ASSETS

  HList(space-x="3" h="full")
    VList()
      h3(font="bold" uppercase="~") Collection

    button(@click="toggle") List View

  div(grid="~ cols-2 md:cols-3 lg:cols-4 2xl:cols-5" divide-x="0.5" v-if="!viewingList")
    ListItem(:token="token" v-for="token in allTokens" b="gray-400")

  VTable(:columns="columns" :rows="rows" initial-sort="tier" v-else)
    template(#item-asset="{row}")
      HList(items="center" space-x="2")
        TokenImage(:token="row" w="12")
        TokenName(:token="row")

</template>


<script lang="ts" setup>

const viewingList = ref(false)
const toggle = () => viewingList.value = !viewingList.value
const { allTokens, fetchUserInventory } = useUserData()
await fetchUserInventory()

definePageMeta({
  middleware: 'auth'
})

type Column = {
  label: string,
  value: keyof DataListItem,
  sortable?: boolean
}


const columns: Column[] = [
  { label: "Asset", value: "asset", sortable: true },
  { label: "Type", value: "type", sortable: true },
  { label: "Tier", value: "tier", sortable: true },
]

interface DataListItem {
  asset: string,
  type?: string,
  tier?: string
}

const rows = computed<DataListItem[]>(() =>
  allTokens.value.map((token) => {
    return {
      ...token
      // avatar: data.value?.image
    } as DataListItem
  })

)

</script>