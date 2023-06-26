<template lang="pug">
div(m="!l-0" p="6" grid="~ cols-5" w="full" 
    bg="black" pos="absolute top-full")
  HeaderCategory(grid="col-span-1 s-increased:col-span-2" v-for="(category, index) in header.categories" items="center" :category="category" :parent-type="header.type" grow="" @onClickItem="onClickItem" :state="columnSize[index]")
    
//-img(:src="getBackground")
</template> 

<script lang="ts" setup>
import FallbackVue from '~/components/Fallback.vue';
import ImageCoreClient from '~/components/Token/ImageCore.client.vue';
import type { HeaderCategory, HeaderItem } from '~/composables/useSiteHeader';

import Buy from "../../../assets/images/header/background/buy/background.png"
import Play from "../../../assets/images/header/background/buy/background.png"
import Corporations from "../../../assets/images/header/background/Corporations/background.png"
import Stake from "../../../assets/images/header/background/stake/background.png"
import Analytics from "../../../assets/images/header/background/analytics/background.png"
import Community from "../../../assets/images/header/background/community/background.png"

// console.log(Buy)
// console.log(Play)
// console.log(Corporations)
// console.log(Stake)
// console.log(Analytics)
// console.log(Community)


const {header} = defineProps<{
  header: HeaderItem,
}>()

const columnSize = computed(() => {
  let spansLeft = 5

  return header.categories.map((item) => {
    const count = getColumnCount(item, spansLeft)
    spansLeft -= count
    return count == 2 ? 'increased' : ''
  })
})

const getColumnCount = (category: HeaderCategory, spansLeft: number) => {
  if(category.items.length > 3 && spansLeft >= 2)
    return 2

  return 1
}


const getBackground = () =>{
  switch (header.type) {
    case 'buy':
      return Buy
    case 'play':
      return Play
    case 'corporations':
      return Corporations
    case 'stake':
      return Stake
    case 'analytics':
      return Analytics
    case 'community':
      return Community
  }
  return Community
}



const background = await import(`../../../assets/images/header/background/${header}/background.jpg`).catch(() => FallbackVue)
//console.log("background", background)
const emit = defineEmits(["onClickItem"])

const onClickItem = (type: string, catagory: string, item: string) => {
  //console.log("OnClicked Header Item", type, catagory, item)
  emit('onClickItem', type, catagory, item)
}

</script>