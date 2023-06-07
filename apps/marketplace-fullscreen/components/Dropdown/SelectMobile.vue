<template lang="pug">
ButtonSquareIcon()
  CollectionIcon(w="6" @click="isOpen = !isOpen" pos="relative" ref="element")

  Transition(name="fade")
    VList(frame="~ gray-400" mt="2" v-if="isOpen" w="100vw" font="bold" pos="!absolute top-full right-(-28)" z="11")
      template(v-for="item in items")
        HList(h="12" px="3" justify="between" items="center" b="b-1 gray-600" bg="gray-800 hover:gray-700" w="full" @click="isOpen = false")
          slot(name="item" :item="item")

</template>

<script lang="ts" setup generic="T extends object">
import CollectionIcon from '~/assets/icons/explore-collection.svg'


const isOpen = ref(false)
const element = ref()

onClickOutside(element, () => isOpen.value = false)

defineProps<{
  items: T[]
}>()
</script>