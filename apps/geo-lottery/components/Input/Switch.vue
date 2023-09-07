<template lang="pug">
transition(name="fade")
  //button(flex="~ " items="center" :justify="modelValue ? 'start' : 'end'" h="13" bg="transparent" mr-3 b="1 ix-pink opacity-40" rounded="full" p="x-5" w="full" @click.prevent="setValue")
  //  HList(space-x="3" items="center")
  //    HList(rounded="full" bg="white " color="white" w="4" h="4" pos="relative")
  //    span(color="white" text="lg")
  //      slot()
  button(flex="~ " items="center" :justify="modelValue ? 'end' : 'start'" h="6" w-10 bg="transparent" mr-3 b="1 ix-pink opacity-40" rounded="full"  @click.prevent="setValue")
    HList(rounded="full" bg="white " color="white" w="4" h="4" pos="relative" mr-1 ml-1)
    span(color="white" text="lg")
      slot()
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(["update:modelValue"])
const modelValue = useVModel(props, 'modelValue', emit)

const setValue = () => {
  console.log('modelValue.value', modelValue)
  console.log('modelValue.value', modelValue.value)
  modelValue.value = !modelValue.value
}

</script>

