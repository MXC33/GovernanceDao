<template lang="pug">
div()
  div(text="ix-orange" p="2") {{ $t(`marketplace.headers.${parentType}.${category.type}.title`) }} 
  div(b="b-1 ix-orange" w="95%")

  div(grid="~ cols-1 s-two:cols-2 s-three:cols-3" :state="gridState" )
    HeaderCategoryItem(:header="parentType" :category="category.type" :item="item" v-for="item in category.items" @click="$emit('onClickItem', item)" items="center") 

</template>

<script lang="ts" setup>
import type { HeaderCategory } from '~/composables/useSiteHeader';

const props = defineProps<{
  parentType: string,
  category: HeaderCategory
}>()


const gridState = computed(() => {
  const gridItems = props.category.items.length
  if(gridItems > 6)
    return 'three'
  
  if(gridItems > 3)
    return 'two'
})

</script>