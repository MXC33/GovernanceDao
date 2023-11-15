<template lang="pug">
HList(items="start" space-x="2" cursor="pointer" @click.stop="toggle" select="none")
  HList(b="1 gray-400 group-hover:gray-300 on-selected:0 gray-400" bg="on-selected:ix-primary" color="white" w="5" h="5" pos="relative" :selected="isSelected" flex-shrink="0")
    CheckmarkIcon(fill="white" w="3" h="3" pos="absolute-center" transition="all" v-show="isSelected")

  label(cursor="pointer" v-if="$slots.default")
    slot

</template>

<script lang="ts" setup>
const CheckmarkIcon = await import(`../../assets/icon/checkmark.svg`).catch(() => '')

const isSelected = defineModel<boolean>()

const toggle = () => {
  console.log("Selected", isSelected.value)
  isSelected.value = !isSelected.value
}

</script>