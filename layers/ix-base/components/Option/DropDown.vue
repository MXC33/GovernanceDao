<template lang="pug">
VList(pos="relative" ref="element" w="lt-md:full")
  HList(font="bold" frame="~ gray-400 hover:gray-300" color="white" h="10 on-large:12" px="3" justify="between" items="center" cursor="pointer" space-x="3" @click="isOpen = !isOpen" :large="large")
    HList(display="flex" justify="space-between" capitalize="~" select="none" whitespace="nowrap" overflow="hidden" text-overflow="ellipsis" space-x="3")
      slot(name="selectedName")

    Transition(name="fade" mode="out-in")
      HelperChevron(w="5" :up="isOpen" flex-shrink="0")

  Transition(name="fade")
    div(frame="~ gray-400" mt="2" v-if="isOpen" pos="!absolute top-full on-left:left-0 right-0" w="lt-md:full" min-w="80" font="bold" :left="left")
      slot(name="beforeItems")

      VList( @click="isOpen = false")
        slot(name="item" :item="item" v-for="item in items")

</template>

<script lang="ts" setup generic="T extends object | string">
const isOpen = shallowRef(false)
const element = ref()

onClickOutside(element, () => isOpen.value = false)
defineProps<{
  items: T[],
  large?: boolean
  left?: boolean
}>()

</script>