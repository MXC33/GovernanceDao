<template lang="pug">
div(cursor="pointer" flex="~ " justify="between" items="center" h="12" p="r-8" w="full" :selected="isSelected" @click.stop="toggle" group)
  HList(space-x="4" w="full" justify="between" items="center")
    InputCheckbox(v-model="isSelected")
      span(translate-y="-0.1")
        slot()

    span(color="gray-200" font="base")
      slot(name="value")
</template>

<script lang="ts" setup>
const isSelected = defineModel<boolean>()

const toggle = () => {
  isSelected.value = !isSelected.value
}


</script>