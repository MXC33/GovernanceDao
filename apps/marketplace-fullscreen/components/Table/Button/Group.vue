<template lang="pug">
div(pos="relative" w="8")
  VList(v-if="!isOpen" bg="gray-600" h="8" justify="center" items="center" space-y="1" py="2 on-open:0" cut="bottom-right s-sm b-gray-600" @click="isOpen = true" :open="isOpen")
    div(rounded="full" bg="white" w="1" h="1")
    div(rounded="full" bg="white" w="1" h="1")
    div(rounded="full" bg="white" w="1" h="1")


  HList(space-x="1px" pos="absolute right-0 top-50%" translate-y="-50%" v-if="isOpen" ref="openElement" @click.stop)
    slot()
</template>


<script setup lang="ts">
const isOpen = shallowRef(false)
const openElement = ref()
onClickOutside(openElement, () => isOpen.value = false)

</script>