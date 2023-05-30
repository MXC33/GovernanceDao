<template lang="pug">
VList() 
  div(text="ix-orange" p="2") {{ $t(`marketplace.headers.${parentType}.${category.type}.title`) }} 
  div(b="b-1 ix-orange" w="95%")

  div(grid="~ cols-3")
    HeaderCategoryItem(:header="parentType" :category="category.type" :item="item" v-for="item in category.items" @click="$emit('onClickItem', item)") 

</template>

<script lang="ts" setup>
import type { HeaderCategory } from '~/composables/useSiteHeader';

const props = defineProps<{
  parentType: string,
  category: HeaderCategory
}>()
</script>