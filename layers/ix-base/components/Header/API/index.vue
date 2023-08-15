<template lang="pug">
div()
  VList(pos="fixed right-0 bottom-0 top-12" w="md:100" inset="lt-md:0" bg="black" overflow-y="auto" m="!l-0" z="200" display="lg:none")
    HeaderAPIAccount(@close="$emit('close')")
    HeaderAPIMenu()
    HeaderAPIButtonDisconnect(pos="sticky bottom-0" z="1")
  div(m="!l-0" p="6 t-3" grid="~ cols-5" w="full" bg="black" pos="absolute top-16" z="99" display="lt-lg:none")
    HeaderAPIMenuItem(grid="col-span-1 s-increased:col-span-2" v-for="(navigation, index) in header.subNavigations" items="center" grow="" :navigation="navigation" :state="columnSize[index]")
</template>

<script lang="ts" setup>
//defineEmits(['close'])

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