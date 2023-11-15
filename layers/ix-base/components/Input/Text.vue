<template lang="pug">
HList(frame="~ hover:gray-300" bg="transparent hover:gray-800 on-focused:gray-800" w="full" ref="element" group)
  HList(items="center" w="full")
    input(p="x-3 y-2" outline="0" bg="transparent" v-model="model" w="full" display="block" transition="all" :placeholder="placeholder" :type="type")

    HList(v-if="$slots.suffix" p="x-3" color="gray-200" bg="transparent" h="full" items="center")
      slot(name="suffix")
</template>

<script setup lang="ts">
const model = defineModel<string | number | undefined>()

const { maxAmount, type } = defineProps<{
  placeholder?: string
  maxAmount?: number,
  type: 'text' | 'number'
}>()

watch(model, () => {
  if (maxAmount == undefined || type != 'number')
    return

  if (Number(model.value) > maxAmount)
    model.value = maxAmount

})

</script>