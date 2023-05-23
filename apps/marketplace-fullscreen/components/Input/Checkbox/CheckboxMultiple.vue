<template lang="pug">
transition(name="fade")
  button(flex="~ " justify="between" items="center" font="bold" uppercase="~" h="12" bg="ix-black hover:gray-900 on-selected:gray-900" p="r-8" w="full" :selected="isSelected" group @click.stop="toggle")
    HList(space-x="4")
      HList(b="2 gray-400 on-selected:0" bg="on-selected:ix-primary" color="white" w="5" h="5" pos="relative" :selected="isSelected")
        CheckmarkIcon(fill="white" w="3" h="3" pos="absolute-center" transition="all" :selected="isSelected" v-if="isSelected")
      span(color="white" font="normal")
          slot()

    span(color="gray-200" font="normal")
      slot(name="value")

</template>

<script lang="ts" setup>
import CheckmarkIcon from 'assets/icons/checkmark.svg'

const props = defineProps<{
  value: string
}>()

const emit = defineEmits(["checked"])
const isSelected = ref(false)
const toggle = () => isSelected.value = !isSelected.value

watch(isSelected, (newValue, oldValue) => {
    emit('checked',  props.value)
})
</script>