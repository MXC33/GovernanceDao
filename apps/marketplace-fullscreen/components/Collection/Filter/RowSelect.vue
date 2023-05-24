<template lang="pug">
button(flex="~ " justify="between" items="center" font="bold" uppercase="~" h="12" bg="ix-black hover:gray-900 on-selected:gray-900" p="r-8" w="full" :selected="isSelected" @click.stop="toggle" group)
  HList(space-x="4" w="full" justify="between")
    InputCheckbox(v-model="isSelected")
      slot()

    span(color="gray-200" font="normal")
      slot(name="value")

</template>

<script lang="ts" setup>
const isSelected = defineModel<boolean>()

const toggle = () => {
  isSelected.value = !isSelected.value
  console.log("Click toggle")
}

watch(isSelected, (newValue, oldValue) => {
  console.log(`isSelected changed from ${oldValue} to ${newValue}`)
})

</script>