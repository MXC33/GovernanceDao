<template lang="pug">
div()
  div(text="gray-200" p="2") {{ subNavigation.title }} 
  div(b="b-1 gray-400" w="95%")

  div(grid="~ cols-1 s-two:cols-2 s-three:cols-3" :state="gridState")
    HeaderCategoryItem(v-for="subItem in subNavigation.item" :item="subItem" items="center") 

</template>

<script lang="ts" setup>
import type { HeaderMenuSubNavigation } from '~/composables/useSiteHeader';

const props = defineProps<{
  subNavigation: HeaderMenuSubNavigation,
}>()

const gridState = computed(() => {
  const gridItems = props.subNavigation.item.length
  if (gridItems > 6)
    return 'three'

  if (gridItems > 3)
    return 'two'
})

</script>