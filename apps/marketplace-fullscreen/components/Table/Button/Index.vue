<template lang="pug">
ButtonSound(sound="sm" bg="gray-400 hover:gray-300 on-primary:(ix-primary hover:ix-ne)" :primary="button.type == 'primary'" cut="bottom-right xs md:(bottom-right sm)" px="2.2 md:6" py="3 md:3" text="lt-md:xs" uppercase="~" font="bold" @click="onClickButton")

  slot
  
</template>


<script setup lang="ts" generic="T extends TableRow">
import type { TableButton, TableRow } from '~/composables/useTable';

const { button, row } = defineProps<{
  button: TableButton<T>,
  row: T
}>()

const onClickButton = () => {
  button.onClick(row)
}

</script>