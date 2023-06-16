<template lang="pug">
div(m="!l-0" p="6" grid="~ rows-2 md:rows-3 lg:rows-4 2xl:rows-5 " w="full" flex="~ wrap" bg="gray-800" pos="absolute top-full")
  HeaderCategory(v-for="category in header.categories" items="center" :category="category" :parent-type="header.type" grow="" wrap="" @onClickItem="onClickItem")
    
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