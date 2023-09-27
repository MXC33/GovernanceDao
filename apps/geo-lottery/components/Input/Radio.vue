<template lang="pug">
transition(name="fade")
  button(flex="~ " justify="center" items="center" font="normal on-selected:bold" h="14" bg="transparent hover:(ix-white opacity-20) on-selected:(ix-white opacity-20)" b="1 ix-white opacity-40" rounded="lg" p="x-5" w="full" :selected="modelValue == value" group @click.stop="setValue")
    HList(space-x="3" items="center")
      HList(rounded="full" b="1 (ix-white opacity-40) on-selected:ix-pink" bg="on-selected:ix-pink" color="white" w="5" h="5" pos="relative" :selected="modelValue == value")
        div(rounded="full" bg="on-selected:!white" w="2" h="2" pos="absolute-center" :selected="modelValue == value")
      span(color="white" text="lg")
        slot()

    span(color="ix-white")
      slot(name="info")
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: string
  value: string
}>()

const emit = defineEmits(["update:modelValue"])
const modelValue = useVModel(props, 'modelValue', emit)

const setValue = () => {
  modelValue.value = props.value
}

</script>

