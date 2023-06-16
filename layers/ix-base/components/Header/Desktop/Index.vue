<template lang="pug">
div(m="!l-0" p="6" grid="~ cols-5" b="1 red" w="full" 
  bg="gray-800" pos="absolute top-full")
  HeaderCategory(grid="col-span-1" v-for="category in header.categories" items="center" :category="category" :parent-type="header.type" grow="" @onClickItem="onClickItem")
    
</template> 

<script lang="ts" setup>
import type { HeaderItem } from '~/composables/useSiteHeader';

const props = defineProps<{
  header: HeaderItem,
}>()

const emit = defineEmits(["onClickItem"])

const onClickItem = (type: string, catagory: string, item: string) => {
  //console.log("OnClicked Header Item", type, catagory, item)
  emit('onClickItem', type, catagory, item)
}

</script>