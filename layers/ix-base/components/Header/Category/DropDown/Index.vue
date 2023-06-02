<template lang="pug">
VList(v-for="header in siteTopHeaders" grid="~ cols-2")
  CollectionFilterDrawer(bg="black")
    template(#header) 
      div() {{ $t(`marketplace.navigation.${header.type}.title`)}}
    template(#default) 
      //- HeaderCategory(
      //-   v-for="category in header.categories" grow="" items="center"
      //-   :category="category" :parent-type="header.type")

      //- HeaderCategoryDropDownGrid(v-for="category in getAllSmallCatagories(header)" :category="category" :parentType="header.type" grid="~ cols-2")

      HeaderCategoryDropDownLargeGroup(v-for="category in getAllLargeCatagories(header)" :category="category" :parentType="header.type")

      HeaderCategoryDropDownSmallGroup(:headerItem="header")

</template>

<script lang="ts" setup>

import type { HeaderItem, HeaderCategory } from '~/composables/useSiteHeader';
const { siteTopHeaders } = useSiteHeader()
const { t } = useI18n()

const getAllLargeCatagories = (header: HeaderItem) => {
  var largeCatagories = []
  for(var i = 0; i < header.categories.length; i++){
    const topHeader = header.categories[i]
    const items = topHeader.items;
    const length = items.length;
    //console.log("items length",length)
    if(length > 1){
      largeCatagories.push(topHeader)
    }
  }
  //console.log(header.type ,"length", largeCatagories.length)
  return largeCatagories
}

// const props = defineProps<{
//   headers: HeaderItem[]
// }>()
</script>