<template lang="pug">
HList(items="center" p-t="3" space-x="10")
  ButtonSound(sound="sm" btn="~ secondary" cut="bottom-right md" @click="cancelBidOnClick") Cancel
  ButtonSound(sound="sm" btn="~ primary" cut="bottom-right md" @click="updateBidOnClick") Update
</template>

<script setup lang="ts">
import type { TableRow } from '~/composables/useTable';
const { removeBid, placeBid } = useBidsAPI()


const props = defineProps<{
  row: TableRow,
}>()



const cancelBidOnClick = () => {
  console.log(props.row)
}

const updateBidOnClick = () => {
  console.log(props.row)
}

</script>