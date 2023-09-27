<template lang="pug">
VList(space-y="1")
  PopupTokenItem(v-for="item in slice" :item="item")

  div(grid="md:~ cols-3" space-y="2" v-if="items.length > SLICE_WINDOW" text="xs" w="full")
    VList(b="1 white opacity-40" justify="center" flex-grow="1" p="1" grid="col-span-2") {{ items.length }} {{ $t(`taskManager.eventsTotal`) }}

    HList(space-x="1" w="full" min-h="8")
      PopupTokenItemArrowButton(@click="offset -= 1" w="lt-md:50%")
      PopupTokenItemArrowButton(@click="offset += 1" rotate="180deg" w="lt-md:50%")

</template>

<script setup lang="ts">
import type { PopupTokenInfoItem } from '~~/composables/usePopupToken'
const SLICE_WINDOW = 5

const offset = ref(0)
const maxSlice = computed(() => Math.min(props.items.length, SLICE_WINDOW))
const modulus = (x: number, n: number) => ((x % n) + n) % n

const slice = computed(() => {
  const newList = []
  for (var j = 0; j < maxSlice.value; j++) {
    const indexCheck = modulus(offset.value + j, props.items.length)
    newList.push(props.items[indexCheck])
  }
  return newList
})

const props = defineProps<{
  items: PopupTokenInfoItem[]
}>()
</script>
