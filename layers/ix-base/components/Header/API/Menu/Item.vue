<template lang="pug">
div()
  div(text="gray-200" p="2") {{ navigation.title }} 
  div(b="b-1 gray-400" w="95%")

  div(grid="~ cols-1 s-two:cols-2 s-three:cols-3" :state="gridState")
    HeaderAPIMenuSubNavigationItem(:item="subItem" v-for="subItem in navigation.item" ) 

</template>

<script lang="ts" setup>
import type { HeaderMenuSubNavigation } from '~/composables/useSiteHeader';

const props = defineProps<{
  navigation: HeaderMenuSubNavigation,
}>()

const gridState = computed(() => {
  const gridItems = props.navigation.item.length
  if (gridItems > 6)
    return 'three'

  if (gridItems > 3)
    return 'two'
})

</script>