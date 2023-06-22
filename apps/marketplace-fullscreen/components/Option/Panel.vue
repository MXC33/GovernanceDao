<template lang="pug">
VList(w="full" bg="gray-900" z="99" pos="fixed" inset="0" overflow-x="hidden" overflow-y="auto")

  HList(justify="start" items="center" px="3 on-search:0 md:4" py="3" space-x="3" pos="sticky top-0" bg="gray-900" b="on-search:lt-md:(b-0.5 gray-600)" :search="isSearch")

    HList(items="center" color="white" translate-y="0.5" w="full" flex-grow="1" v-if="$slots.search" @click="onSelect")
      slot(name="search")

    HList(items="center" space-x="2" color="white" font="bold" text="lg" translate-y="0.5" uppercase="~" flex-grow="lt-md:1" v-if="$slots.header")
      slot(name="header")

    CloseIcon(w="4" cursor="pointer" @click="$emit('close')" translate-y="0.2" pos="on-search:absolute top-3.8 right-4" :search="isSearch")

  VList(w="full" flex-grow="1" b="t-1 gray-600" v-if="$slots.default")
    slot(name="beforeItems")

    div(@click="onSelect")
      slot(name="default")

  VList(pos="sticky bottom-0" v-if="$slots.buttons")
    slot(name="buttons")

</template>

<script lang="ts" setup>
import CloseIcon from '~/assets/icons/close.svg'

const emit = defineEmits(["close"])

defineProps<{
  isSearch?: boolean
}>()

const onSelect = () => {
  setTimeout(() => emit('close'), 250)
}
</script>