<template lang="pug">
div() {{ pre }}{{ setPriceDecimals }}{{ post }}

</template>

<script setup lang="ts">
const {
  type = 'ixt',
  value
} = defineProps<{
  value?: number,
  type?: 'ixt' | 'usd'
}>()

const pre = computed(() => {
  if (type == 'usd')
    return '$'
})

const post = computed(() => {
  if (type == 'ixt')
    return ' IXT'
})

const setPriceDecimals = computed(() => {
  if (!value)
    return ' --'
  if (value < 0.009)
    return roundToDecimals(value, 4)
  return roundToDecimals(value, 4)
})
</script>