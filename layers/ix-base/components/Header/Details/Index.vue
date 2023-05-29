<template lang="pug">
Transition(name="slide-top")
  div(p="6" grid="~ cols-2 md:cols-3 lg:cols-4 2xl:cols-5" w="full" flex="~" text="14px" bg="black")
    HeaderDetailsTitle(items="center" grow="~"
    v-for="x in categoryHeaderObject.length" 
    :title="categoryHeaderObject[x - 1].title")  
      HeaderDetailsDescription(
        v-for="y in categoryHeaderObject[x - 1].subHeaders.length" 
        :subHeaderObject="categoryHeaderObject[x - 1].subHeaders[y - 1]"
        @click="$emit('clicked-On-DropDown-Item', x - 1, y - 1)") 
</template> 

<script lang="ts" setup>
import { CategoryHeaderObject } from '~/composables/useSiteHeader';

const props = defineProps<{
  categoryHeaderObject: CategoryHeaderObject[],
}>()

</script>