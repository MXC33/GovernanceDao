<template lang="pug">
CatRaffTableItem(:data="data")
  template(#details )
    div(font="bold") Address
    div(font="bold") Prize
</template>

<script lang="ts" setup>
import type { CatRaffTicketInfoFragment } from '#gql';
const { data: prizeData, refresh: fetchCatRaffPrizes } = useCatRaffPrizes();


defineProps<{
  data: CatRaffTicketInfoFragment[]
}>()
</script>