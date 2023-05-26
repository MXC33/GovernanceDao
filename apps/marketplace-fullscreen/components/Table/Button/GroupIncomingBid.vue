<template lang="pug">
HList(items="center" p-t="3" space-x="10")
  ButtonSound(sound="sm" btn="~ secondary" cut="bottom-right lg" @click="counterBidOnClick") Counter  
  ButtonSound(sound="sm" btn="~ primary" cut="bottom-right lg" @click="acceptBidOnClick") Accept
</template>

<script setup lang="ts">
import type { TableRow } from '~/composables/useTable';


const { counterBid, acceptBid } = useBidsAPI()

const props = defineProps<{
  row: TableRow,
}>()

const counterBidOnClick = () => {
  console.log(props.row)
}

const acceptBidOnClick = () => {
  console.log(props.row)
}




</script>