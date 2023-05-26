<template lang="pug">
HList(items="center" p-t="3" space-x="10")
  ButtonSound(sound="sm" btn="~ secondary" cut="bottom-right" @click="cancelBid") Cancel
  ButtonSound(sound="sm" btn="~ primary" cut="bottom-right" @click="acceptBid") Update
</template>

<script setup lang="ts">
import type { TableRow } from '~/composables/useTable';


const props = defineProps<{
  row: TableRow,
}>()



const cancelBid = () => {
  console.log(props.row)
}

const acceptBid = () => {
  console.log(props.row)
}

</script>