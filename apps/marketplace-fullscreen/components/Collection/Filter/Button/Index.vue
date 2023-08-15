<template lang="pug">
HList(cut="top-right s-xs b-gray-600 md:(top-right s-sm b-gray-600 hover:(b-gray-500))" bg="gray-600" items="center" px="3" py="2" space-x="3 md:4" cursor="pointer" group)
  HList(items="center" space-x="1")
    span(color="gray-200" text="xs md:sm" translate-y="0.5" font="bold")
      slot(name="category")

    span(color="white" text="xs md:sm" translate-y="0.5" font="bold")
      slot(name="type")

  HList(items="center" @click="clickClear")
    CloseIcon(w="3" fill="white group-hover:gray-200")
</template>

<script lang="ts" setup>
import CloseIcon from '~/assets/icons/close.svg'

const emit = defineEmits(["clear"])

const clickClear = () => {
  emit('clear')
}
</script>