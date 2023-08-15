<template lang="pug">
transition(name="fade")
  button(flex="~ " justify="between" items="center" font="bold" uppercase="~" h="12" bg="ix-black hover:gray-900 on-selected:gray-900" p="r-8" w="full" :selected="modelValue" group @click.stop="toggle")
    HList(space-x="4")
      HList(rounded="full" b="2 gray-400 on-selected:0" bg="on-selected:ix-primary" color="white" w="5" h="5" pos="relative" :selected="modelValue")
        div(rounded="full" bg="on-selected:!white" w="2" h="2" pos="absolute-center" :selected="modelValue")
      span(color="white" font="normal")
        slot()
      span(color="red" font="normal") {{ modelValue }}



    span(color="gray-200" font="normal")
      slot(name="value")

</template>

<script lang="ts" setup>

let isSelected = false
const props = defineProps<{
  modelValue: string
  isSelected?: boolean
}>()
watch(props, (newValue, oldValue) => {
  nextTick(() => {
    isSelected = !props.isSelected
  })
})

const emit = defineEmits(["update:modelValue"])
const modelValue = useVModel(props, 'modelValue', emit)
const toggle = () => modelValue.value = modelValue.value

</script>

