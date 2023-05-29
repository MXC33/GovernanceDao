<template lang="pug">
HList(cut="top-right sm !b-gray-400 hover:(!b-gray-300)" items="center" px="3.5" py="2" cursor="pointer" group)
  span(color="gray-200 group-hover:gray-50" text="sm" translate-y="0.5" font="bold" @click="toggle") Clear All
</template>

<script lang="ts" setup>
const isSelected = defineModel<boolean>()

const toggle = () => {
  isSelected.value = false
}

watch(isSelected, (newValue, oldValue) => {
  console.log(`isSelected changed from ${oldValue} to ${newValue}`)
})
</script>