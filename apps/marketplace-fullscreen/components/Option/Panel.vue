<template lang="pug">
VList(w="full" bg="gray-900" z="99" pos="fixed" inset="0" overflow-x="hidden" overflow-y="auto")

  HList(justify="between" items="center" px="4" py="3" space-x="3" pos="sticky top-0" bg="gray-900")
    HList(items="center" space-x="2" color="white" font="bold" text="lg" translate-y="0.5" uppercase="~")
      slot(name="header")

    CloseIcon(w="4" cursor="pointer" @click="$emit('close')" translate-y="0.2")

  VList(w="full" flex-grow="1" )
    slot(name="beforeItems")

    div(@click="onSelect")
      slot(name="default")

  VList(pos="sticky bottom-0" v-if="$slots.buttons")
    slot(name="buttons")

</template>

<script lang="ts" setup>
import CloseIcon from '~/assets/icons/close.svg'

const emit = defineEmits(["close"])

const onSelect = () => {
  setTimeout(() => emit('close'), 250)
}
</script>