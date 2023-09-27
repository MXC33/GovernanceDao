<template lang="pug">
ButtonSound(:sound="isDisabled ? 'none' : 'lg'" flex="~ col grow" min-h="0" w="full" text="left")
  ClipPath(aspect="5/8 lt-md:square" :is-disabled="isDisabled" :is-active="isActive" pos="relative" cursor="on-disable:default pointer" :disable="isDisabled" @click="onClickOpen" p="1px" w="full") 

    img(w="full" h="full" :src="bgImage" object="cover" pos="absolute" inset="0")

    div(flex="~ col grow" justify="center" pos="relative" min-h="0" w="full")  
      div(pos="absolute left-12 right-12" max-w="55" mx="auto" flex-center="col")
        slot(name="logo")

        div(text="lg center" mt="5" v-if="isDisabled") {{$t(`game.terminal.entry.cSoon`)}}

    div(flex="~ col shrink-0" p="3" pos="relative" backdrop="~ blur-lg" color="white opacity-60" text="sm" b="on-disabled:(white opacity-30) t-1 mc-orange_40" :disabled="isDisabled")
      slot


</template>
  
<script lang="ts" setup>
import MCBg from '~/assets/images/terminal/entry/mc-bg.png'
import NetBg from '~/assets/images/terminal/entry/netempire-bg.png'
import InventoryBg from '~/assets/images/terminal/entry/inventory-bg.png'

const bgImage = computed(() => {
  switch (props.backgroundStyle) {
    case 'mc':
      return MCBg
    case 'netempire':
      return NetBg
    case 'inventory':
      return InventoryBg
  }
})

const isActive = ref(false)

const emit = defineEmits(['open'])

const onClickOpen = () => {
  isActive.value = true
  emit("open")
}

const props = defineProps<{
  backgroundStyle: 'netempire' | 'mc' | 'inventory',
  isDisabled?: boolean
}>()

</script>
