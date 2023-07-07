<template lang="pug">
HList(frame="~" items="center" :w="moduleSize" :module="isModule")
  input(bg="transparent" p="x-3 y-2" outline="0" v-model="model" w="full" display="block")

  div(v-if="$slots.suffix" p="x-3" color="gray-200")
    slot(name="suffix")
</template>

<script setup lang="ts">
const model = defineModel<string | number | undefined>()

defineProps<{
  isModule?: boolean
}>()

const { isMobile } = useDevice()

const moduleSize = computed(() => {
  if (isMobile.value)
    return 'full on-module:100%'

  return 'full on-module:50%'
})
</script>