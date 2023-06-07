<template lang="pug">
div(m="!l-0" p="6" grid="~ cols-2 md:cols-3 lg:cols-4 2xl:cols-5" w="full" flex="~" bg="gray-800" pos="absolute top-full")
  HeaderCategory(items="center" :category="category" :parent-type="header.type" v-for="category in header.categories" grow="" @onClickItem="OnClicked")
    
</template> 

<script lang="ts" setup>
import type { HeaderItem } from '~/composables/useSiteHeader';

const props = defineProps<{
  header: HeaderItem,
}>()

const emit = defineEmits(["onClickItem"])

const OnClicked = (type: string, catagory: string, item: string) => {
  console.log("OnClicked Header Item", type, catagory, item)
  emit('onClickItem', type, catagory, item)
}

</script>