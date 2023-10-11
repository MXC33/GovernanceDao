<template lang="pug">
//-Display this when in portrait mode
VList(v-if="isMobile" pos="absolute left-0 right-0 top-$header-height" bg="black" h="[calc(100vh-var(--header-height))]" overflow-y="auto" z="1")
  HeaderNavigationAccount(@close="$emit('close')")
  HeaderNavigationMenu()
  HeaderNavigationButtonDisconnect(pos="sticky bottom-0" z="1")

//-Display this when in landscape mode
div(m="!l-0" p="6 t-3" grid="~ cols-5" w="full" bg="black" pos="absolute top-full right-0 left-0" z="1" v-else)
  HeaderNavigationMenuSubNavigationDesktop(grid="col-span-1 s-increased:col-span-2" v-for="(navigation, index) in header.subNavigations" grow="" :navigation="navigation" :state="columnSize[index]")

</template>

<script lang="ts" setup>
import type { HeaderMenuItem, HeaderMenuSubNavigation } from '~/composables/useSiteHeader';

const { useMobileBreakpoint } = useDevice()
const isMobile = useMobileBreakpoint('lg')

const { header } = defineProps<{
  header: HeaderMenuItem
}>()

const isMounted = useMounted()

const lockScroll = (active: boolean) => {
  // document.body.classList.toggle("is-scroll-locked", active)
}


watch([isMounted], ([mounted]) => {
  const enable = mounted
  if (!process.client) {
    return
  }
  lockScroll(enable)
}, { immediate: true })

onUnmounted(() => {
  lockScroll(false)
})

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