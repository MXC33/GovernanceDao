<template lang="pug">
transition(name="fade")
  //button(flex="~ " items="center" :justify="modelValue ? 'start' : 'end'" h="13" bg="transparent" mr-3 b="1 ix-pink opacity-40" rounded="full" p="x-5" w="full" @click.prevent="setValue")
  //  HList(space-x="3" items="center")
  //    HList(rounded="full" bg="white " color="white" w="4" h="4" pos="relative")
  //    span(color="white" text="lg")
  //      slot()
  button.ease-in.duration-200(flex="~ " items="center" w="10" h="6" w-10 bg="white opacity-10" mr-3 rounded="full"
    :justify="modelValue ? 'end' : 'start'"
    :b="modelValue ? '1 white opacity-40' : '1 ix-pink'"
    @click.prevent="setValue"
    )
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
  modelValue.value = !modelValue.value
}

</script>

