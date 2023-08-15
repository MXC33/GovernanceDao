<template lang="pug">
ButtonSound(v-if="!isHidden" sound="sm" bg="gray-400 hover:gray-300 on-primary:(ix-primary hover:ix-ne)" :primary="button.type == 'primary'" cut="last:~ bottom-right s-sm" px="2.2 md:6" py="1 md:3"  uppercase="~" font="bold" @click="onClickButton" w="full" disable="on-disabled:active" :disabled="isDisabled" flex="~ " justify="center")

  CartIcon(w="6 md:6" v-if="button.icon == 'cart'")

  TrashIcon(w="6 md:6" fill="white" v-if="button.icon == 'trash'")

  slot
    
  
</template>


<script setup lang="ts" generic="T extends TableRow">
import type { TableButton, TableRow } from '~/composables/useTable';
import CartIcon from '~/assets/icons/cart.svg'
import TrashIcon from '~/assets/icons/trash.svg'
const { button, row } = defineProps<{
  button: TableButton<T>,
  row: T
}>()

const isDisabled = computed(() => button.disabled && button.disabled(row))
const isHidden = computed(() => button.hidden && button.hidden(row))


const onClickButton = () => {
  button.onClick(row)
}

</script>