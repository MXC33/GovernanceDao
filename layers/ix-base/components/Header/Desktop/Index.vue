<template lang="pug">
div(m="!l-0" p="6 t-3" grid="~ cols-5" w="full" bg="black" pos="absolute top-16" z="99")
  HeaderCategory(grid="col-span-1 s-increased:col-span-2" v-for="(subNavigation, index) in header.subNavigations" items="center" grow="" :subNavigation="subNavigation" :state="columnSize[index]")
</template> 

<script lang="ts" setup>
import type { HeaderMenuItem, HeaderMenuSubNavigation} from '~/composables/useSiteHeader';

const {header} = defineProps<{
  header: HeaderMenuItem
}>()

const columnSize = computed(() => {
  let spansLeft = 5

  return header.subNavigations.map((item) => {
    const count = getColumnCount(item, spansLeft)
    spansLeft -= count
    return count == 2 ? 'increased' : ''
  })
})

const getColumnCount = (navigation: HeaderMenuSubNavigation, spansLeft: number) => {
  if (navigation.item.length > 3 && spansLeft >= 2)
    return 2

  return 1
}

</script>