<template lang="pug">
ButtonSound(sound="sm" transition="all" cursor="pointer" flex="~ row" rounded="full" bg="gray-500 hover:gray-400 on-active:!$mc-accent" justify="center" items="center" aspect="square" :active="isActive" p="1" min-w="0" w="8")
  Transition(name="icon" mode="out-in")
    PlusIcon(v-if="!isActive" w="full" min-w="0")
    CheckIcon.check-color(v-else w="5" min-w="0")

</template>

<script lang="ts" setup>
import PlusIcon from '~~/assets/images/ui/icons/plus.svg'
import CheckIcon from '~~/assets/images/ui/icons/checkmark.svg'

defineProps<{
  isActive?: boolean
}>()

</script>

<style>
.check-color path {
  fill: var(--corporation-check-color)
}
</style>