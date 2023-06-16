<template lang="pug">
div(m="!l-0" p="6" grid="~ cols-5" w="full" 
    bg="black" pos="absolute top-full")
  HeaderCategory(grid="col-span-1" v-for="category in header.categories" items="center" :category="category" :parent-type="header.type" grow="" @onClickItem="onClickItem")
    
//-img(:src="getBackground")
</template> 

<script lang="ts" setup>
import FallbackVue from '~/components/Fallback.vue';
import ImageCoreClient from '~/components/Token/ImageCore.client.vue';
import type { HeaderItem } from '~/composables/useSiteHeader';

import Buy from "../../../assets/images/header/background/buy/background.png"
import Play from "../../../assets/images/header/background/buy/background.png"
import Corporations from "../../../assets/images/header/background/Corporations/background.png"
import Stake from "../../../assets/images/header/background/stake/background.png"
import Analytics from "../../../assets/images/header/background/analytics/background.png"
import Community from "../../../assets/images/header/background/community/background.png"

console.log(Buy)
console.log(Play)
console.log(Corporations)
console.log(Stake)
console.log(Analytics)
console.log(Community)

const props = defineProps<{
  header: HeaderItem,
}>()

const getBackground = () =>{
  switch (props.header.type) {
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



const background = await import(`../../../assets/images/header/background/${props.header}/background.jpg`).catch(() => FallbackVue)
console.log("background", background)
const emit = defineEmits(["onClickItem"])

const onClickItem = (type: string, catagory: string, item: string) => {
  //console.log("OnClicked Header Item", type, catagory, item)
  emit('onClickItem', type, catagory, item)
}

</script>