<template lang="pug">
div(color="white" p="x-2" flex="~ row" space-x="2" h="8 md:14") 

  input(type="text" bg="mc-orange_10 focus:mc-orange_20" outline="none" px="4" b="1 mc-orange_40" rounded="sm" flex="grow" v-model="searchText" @keyup.enter="clickSearch" @keyup="onKeyUp" @keyup.enter.stop="clickSearch" transition="all" :placeholder="$t(`general.search.example`)")

  div(btn="~ accent" bg="hover:mc-orange_20" aspect="square" p="3 md:4" @click="clickSearch") 
    img(src="@/assets/images/ui/icon-search.png" grid="col-span-1" object="contain")

</template>

<script setup lang="ts">
const searchText = ref("")

const { search, landSearchResults } = useSearchPix()

const clickSearch = () => {
  search(searchText.value)
}
const onKeyUp = () => {
  if (searchText.value == "")
    clearSearchResults()
}

defineEmits(["inputChange"])
const clearSearchResults = () => landSearchResults.value = null
</script>