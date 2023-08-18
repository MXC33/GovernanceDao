<template lang="pug">
HList(frame="~ hover:gray-300" items="center" :w="moduleSize" :module="isModule" ref="element" group)
  input(@click="userClick" bg="transparent group-hover:gray-800 focus:gray-800" p="x-3 y-2" outline="0" v-model="model" w="full" display="block" transition="all")

  HList(v-if="$slots.suffix" p="x-3" color="gray-200" :bg="focusRules" h="full" items="center")
    slot(name="suffix")
</template>

<script setup lang="ts">
const model = defineModel<string | number | undefined>()
const focused = ref(false)
const element = ref()

onClickOutside(element, () => focused.value = false)

defineProps<{
  isModule?: boolean
}>()

const focusRules = computed(() => {
  return focused.value ? 'gray-800' : 'transparent group-hover:gray-800';
})

const userClick = () => {
  focused.value = true
  console.log(focused.value)
}

const { isMobile } = useDevice()

const moduleSize = computed(() => {
  if (isMobile.value)
    return 'full on-module:100%'

  return 'full on-module:50%'
})


</script>