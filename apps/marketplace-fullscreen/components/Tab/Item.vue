<template lang="pug">
VList(pos="relative")
  HList(font="bold" px="6" py="3" uppercase="~" w="53" cursor="pointer" @click.stop="toggle")
    span(color="white")
      slot
  div(w="full" b="b-0 on-selected:(b-3.43 white) on-ctab:(b-3.43 ix-primary)" z="3" pos="absolute bottom-0" :selected="isSelected" :ctab="collectionTab")
</template>

<script lang="ts" setup>
defineProps<{
  collectionTab?: boolean
}>()

const isSelected = defineModel<boolean>()

const toggle = () => {
  console.log("Click tab", isSelected.value)
  isSelected.value = !isSelected.value
}

watch(isSelected, (newValue, oldValue) => {
  console.log(`isSelected changed from ${oldValue} to ${newValue}`)
})

</script>