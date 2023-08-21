<template lang="pug">
HList(items="start" space-x="2" cursor="pointer" @click.stop="toggle" select="none")
  HList(b="1 gray-400 group-hover:gray-300 on-selected:0 on-substitute:1 gray-400" bg="on-selected:ix-primary on-substitute:!gray-900" color="white" w="5" h="5" pos="relative" :substitute="isSubstitute" :selected="isSelected" flex-shrink="0")
    CheckmarkIcon(fill="white" w="3" h="3" pos="absolute-center" transition="all" v-if="isSelected")

  label(cursor="pointer" v-if="$slots.default")
    slot

</template>

<script lang="ts" setup>
import CheckmarkIcon from 'assets/icons/checkmark.svg'

const isSelected = defineModel<boolean>()

const { isModule, isSubstitute } = defineProps<{
  isModule?: boolean
  isSubstitute?: boolean
}>()

const toggle = () => {
  isSelected.value = !isSelected.value
}

</script>