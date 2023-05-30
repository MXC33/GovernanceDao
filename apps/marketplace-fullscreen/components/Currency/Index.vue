<template lang="pug">
div(v-if="value") {{ pre }}{{ value }}{{ post }}

</template>

<script setup lang="ts">
const {
  type = 'ixt'
} = defineProps<{
  value?: string,
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
</script>