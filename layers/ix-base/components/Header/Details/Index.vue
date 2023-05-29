<template lang="pug">
Transition(name="slide-top")
  div(p="6" grid="~ cols-2 md:cols-3 lg:cols-4 2xl:cols-5" w="full" flex="~" text="14px" bg="gray-800")
    HeaderDetailsTitle(items="center" grow="~"
    v-for="category in header.categories" :title="$t(`marketplace.headers.${header.type}.${category.type}.title`)")  
      HeaderDetailsDescription(:header="header.type" :category="category.type" :item="item" v-for="item in category.subHeaders" @click="$emit('onClickItem', item)") 
</template> 

<script lang="ts" setup>
import type { TopHeader } from '~/composables/useSiteHeader';

const props = defineProps<{
  header: TopHeader,
}>()

</script>