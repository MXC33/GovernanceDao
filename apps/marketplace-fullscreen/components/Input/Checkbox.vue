<template lang="pug">
HList(items="start" space-x="2 on-spacex:0" cursor="pointer" @click.stop="toggle" select="none" :spacex="spaceFalse")
  HList(b="2 gray-400 on-selected:0" bg="on-selected:ix-primary" color="white" w="5" h="5" pos="relative" :selected="isSelected" flex-shrink="0")
    CheckmarkIcon(fill="white" w="3" h="3" pos="absolute-center" transition="all" v-if="isSelected")

  label(cursor="pointer")
    slot

</template>

<script lang="ts" setup>
import CheckmarkIcon from 'assets/icons/checkmark.svg'

const isSelected = defineModel<boolean>()

const toggle = () => {
  isSelected.value = !isSelected.value
}

const { spaceFalse } = defineProps<{
  spaceFalse?: boolean
}>()
</script>