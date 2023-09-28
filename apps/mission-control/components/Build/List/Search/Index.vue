<template lang="pug">
div(space-y="4" )
  BuildListSearchBar()

  div(v-if="isSearchPending" px="4")
    HelperLoaderSpinnerSmall() Searching for your land...

  div(v-else-if="landSearchResults?.length == 0" px="4" text="xs white" font="bold") Sorry. Nothing found.

  div(p="x-4" space-y="4" v-if="landSearchResults?.length > 0" flex="~ col" min-h="0" overflow-y="~ auto" scrollbar="~ mc" max-h="40")
    BuildItemLand(:item="item" v-for="item in landSearchResults" :is-placeable="true")

</template>

<script setup lang="ts">
const { landSearchResults, isSearchPending } = useSearchPix()
onBeforeMount(() => landSearchResults.value = null)

</script>