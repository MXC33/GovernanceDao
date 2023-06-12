<template lang="pug">
div(text="gray-300" p="2") {{ $t(`marketplace.navigation.${parentType}.${category.type}.title`) }}
  div(b="b-1 gray-300" w="95%")
  div(grid="~ cols-1 cols-2")
    //-div(text="ix-orange" p="2") {{ $t(`marketplace.navigation.${header.type}.${category.type}.title`) }} 
    HeaderCategoryDropDownItem(v-for="item in category.items" :header="parentType" :category="category.type" :item="item" :click="clikedItem(item)") 
</template>

<script lang="ts" setup>
import type { HeaderCategory } from '~/composables/useSiteHeader';
const {parentType, category} = defineProps<{
  parentType: string,
  category: HeaderCategory
}>()

const emit = defineEmits(['clikedItem'])

const clikedItem = (item: string) => {
  emit('clikedItem', parentType, category.type, item);
}

</script>