<template lang="pug">
VList(flex-grow="1" w="full")
  VList(v-for="header in siteTopHeaders")
    CollectionFilterDrawer(bg="black")
      template(#header) 
        div() {{ $t(`marketplace.navigation.${header.type}.title`)}}
      template(#default) 
        HeaderCategoryDropDownSmallGroup(:headerItem="header" @clikedItem="clikedItem")
        HeaderCategoryDropDownLargeGroup(v-for="category in getAllLargeCatagories(header)" :category="category" :parentType="header.type" @clikedItem="clikedItem")
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

const emit = defineEmits(['clikedItem'])

const clikedItem = (header: string, category: string, item: string) => {
  emit('clikedItem', header, category, item);
  console.log("Catragory dropdown grid", header, category, item)
}

// const props = defineProps<{
//   headers: HeaderItem[]
// }>()
</script>