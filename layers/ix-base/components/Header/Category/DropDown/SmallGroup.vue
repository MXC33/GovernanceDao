<template lang="pug"> 
div(grid="~ cols-2") 
  div(v-for="category in getAllSmallCatagories(headerItem)" p="2")
    div(text="gray-300") {{ $t(`marketplace.navigation.${headerItem.type}.${category.type}.title`) }}
    div(b="b-1 gray-300" w="95%")
    HeaderCategoryDropDownItem(v-for="item in category.items" :header="headerItem.type" :category="category.type" :item="item")
</template>

<script lang="ts" setup>
import type { HeaderItem } from '~/composables/useSiteHeader';
const props = defineProps<{
  headerItem: HeaderItem
}>()

const getAllSmallCatagories = (header: HeaderItem) => {
  var smallCatagories = []
  for(var i = 0; i < header.categories.length; i++){
    const topHeader = header.categories[i]
    const items = topHeader.items;
    const length = items.length;
    //console.log("items length",length)
    if(length == 1){
      smallCatagories.push(topHeader)
    }
  }
  //console.log(header.type ,"length", smallCatagories.length)
  return smallCatagories
}
</script>