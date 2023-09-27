<template lang="pug">
auto-counter(ref="counter" :startAmount="startValue" :endAmount="endValue" :duration="duration ?? 3" :prefix="prefix" :suffix="suffix" separator="," decimalSeparator="." :decimals="decimals ?? 2" :autoinit="true")
</template>

<script lang="ts" setup>
import AutoCounter from "vue3-autocounter"
const startValue = ref(0)
const endValue = ref(0)

const props = defineProps<{
  value: number,
  suffix?: string,
  prefix?: string,
  decimals?: number,
  duration?: number
}>()

watch(() => props.value, (val) => {
  setTimeout(() => {
    startValue.value = endValue.value
    endValue.value = val
  }, 100)
}, { immediate: true })
</script>
