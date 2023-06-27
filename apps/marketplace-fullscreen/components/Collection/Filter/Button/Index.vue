<template lang="pug">
HList(cut="top-right s-xs md:(top-right s-sm b-gray-600 hover:(b-gray-500))" bg="gray-600 hover:gray-500" items="center" space-x="4" px="3" py="2" cursor="pointer" @click="toggle" :selected="isSelected" group v-if="isSelected")
  span(color="md:gray-200 group-hover:gray-100" text="xs md:sm" translate-y="0.5" font="bold")
    slot()
  HList(items="center" translate-y="0.2")
    CloseIcon(w="2 md:3")
</template>

<script lang="ts" setup>
import CloseIcon from '~/assets/icons/close.svg'

const isSelected = defineModel<boolean>()

const toggle = () => {
  isSelected.value = false
  console.log("Click toggle")
}

watch(isSelected, (newValue, oldValue) => {
  console.log(`isSelected changed from ${oldValue} to ${newValue}`)
})

</script>