<template lang="pug">
HList(cut="top-right sm b-gray-600 hover:(b-gray-500)" bg="gray-600 hover:gray-500" items="center" space-x="4" px="3" py="2" cursor="pointer" @click="toggle" :selected="isSelected" group v-if="isSelected")
  span(color="gray-200 group-hover:gray-100" text="sm" translate-y="0.5" font="bold")
    slot()
  CloseIcon(w="3")
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