<template lang="pug">
HList(@focus="isFocused = true"  @blur="isFocused = false" frame="~ hover:gray-300" bg="transparent hover:gray-800 on-focused:gray-800" w="full" ref="element" :focused="isFocused" group)
  HList(items="center" :w="moduleSize" :module="isModule")
    input(@click="userClick"  p="x-3 y-2" outline="0" bg="transparent" v-model="model" w="full" display="block" transition="all")

    HList(v-if="$slots.suffix" p="x-3" color="gray-200" bg="transparent" h="full" items="center")
      slot(name="suffix")
</template>

<script setup lang="ts">
const model = defineModel<string | number | undefined>()
const isFocused = ref(false)
const element = ref()

onClickOutside(element, () => isFocused.value = false)

defineProps<{
  isModule?: boolean
}>()

const userClick = () => {
  isFocused.value = true
}

const { isMobile } = useDevice()

const moduleSize = computed(() => {
  if (isMobile.value)
    return 'full on-module:100%'

  return 'full on-module:50%'
})


</script>