<template lang="pug">
VList(pos="relative" ref="element" w="lt-md:full")
  HList(font="bold" frame="~ gray-400 hover:gray-300" color="white" h="10" px="3" justify="between" items="center" cursor="pointer" space-x="3" @click="isOpen = !isOpen" )
    div(capitalize="~" select="none")
      slot(name="selectedName")

    Transition(name="fade" mode="out-in")
      HelperChevron(w="5" :up="isOpen")

  Transition(name="fade")
    div(frame="~ gray-400" mt="2" v-if="isOpen" pos="!absolute top-full right-0" w="lt-md:full" min-w="80" font="bold")
      template( v-for="item in items")
        HList(h="12" px="3" justify="between" items="center" b="b-1 gray-600" bg="gray-800 hover:gray-700" @click="isOpen = false")
          slot(name="item" :item="item")

</template>

<script lang="ts" setup generic="T extends object">

const isOpen = ref(false)
const element = ref()

onClickOutside(element, () => isOpen.value = false)

defineProps<{
  items: T[]
}>()
</script>