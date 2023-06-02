<template lang="pug">
div(text="gray-300" p="2") {{ $t(`marketplace.navigation.${parentType}.${category.type}.title`) }}
  div(b="b-1 gray-300" w="95%")
  div(grid="~ cols-1 cols-2")
    //-div(text="$mc-orange" p="2") {{ $t(`marketplace.navigation.${header.type}.${category.type}.title`) }} 
    HeaderCategoryDropDownItem(v-for="item in category.items" :header="parentType" :category="category.type" :item="item" ) 
</template>

<script lang="ts" setup>
import type { HeaderCategory } from '~/composables/useSiteHeader';
const props = defineProps<{
  parentType: string,
  category: HeaderCategory
}>()
</script>