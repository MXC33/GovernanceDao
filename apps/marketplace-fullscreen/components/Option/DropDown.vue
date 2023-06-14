<template lang="pug">
VList(pos="relative" ref="element" w="lt-md:full")
  HList(font="bold" frame="~ gray-400 hover:gray-300" color="white" h="10 on-large:12" px="3" justify="between" items="center" cursor="pointer" space-x="3" @click="isOpen = !isOpen" :large="large")
    div(capitalize="~" select="none" whitespace="nowrap")
      slot(name="selectedName")

    Transition(name="fade" mode="out-in")
      HelperChevron(w="5" :up="isOpen")

  Transition(name="fade")
    div(frame="~ gray-400" mt="2" v-if="isOpen" pos="!absolute top-full right-0" w="lt-md:full" min-w="80" font="bold")
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
}>()

</script>