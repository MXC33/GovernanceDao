<template lang="pug">
transition(name="fade")
  button(flex="~ " justify="between" items="center" font="bold" uppercase="~" h="12" bg="black hover:gray-900 on-selected:gray-900" px="8" w="full" :selected="isSelected" group @click.stop="toggle")
    HList(rounded="full" b="2 gray-400 on-selected:0" bg="on-selected:ix-primary" color="white" w="5" h="5" pos="relative" :selected="isSelected")
      div(rounded="full" bg="on-selected:!white" w="2" h="2" pos="absolute-center" :selected="isSelected")
    slot(name="value")

</template>

<script lang="ts" setup>

const props = defineProps<{
  modelValue: boolean
  isSelected?: boolean
}>()

const emit = defineEmits(["update:modelValue"])
const isSelected = useVModel(props, 'modelValue', emit)
const toggle = () => isSelected.value = !isSelected.value

</script>

