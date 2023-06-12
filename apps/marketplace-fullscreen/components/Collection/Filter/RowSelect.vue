<template lang="pug">
div(cursor="pointer" flex="~ " justify="between" items="center" h="12" bg="ix-black hover:gray-900 on-selected:gray-900" p="r-8" w="full" :selected="isSelected" @click.stop="toggle" group)
  HList(space-x="4" w="full" justify="between" items="center")
    HList(items="center")
      InputCheckbox(v-model="isSelected")
      span(translate-y="0.4")
        slot()

    span(color="gray-200" font="base")
      slot(name="value")

</template>

<script lang="ts" setup>
const isSelected = defineModel<boolean>()

const toggle = () => {
  isSelected.value = !isSelected.value
  console.log("Click toggle")
}


</script>