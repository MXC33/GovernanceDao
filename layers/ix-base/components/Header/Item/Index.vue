<template lang="pug">
div(p="6" grid="~ cols-2 md:cols-3 lg:cols-4 2xl:cols-5" w="full" flex="~" bg="gray-800")
  HeaderCategory(items="center" :category="category" :parent-type="header.type" v-for="category in header.categories" grow="")
    
</template> 

<script lang="ts" setup>
import type { HeaderItem } from '~/composables/useSiteHeader';

const props = defineProps<{
  header: HeaderItem,
}>()

</script>