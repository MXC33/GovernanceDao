<template lang="pug">
CatRaffTableItem(:data="data")
  template(#details)
    div(font="bold") Address
    div(font="bold") Balance 
</template>

<script lang="ts" setup>
import type { CatRaffTicketInfoFragment } from '#gql';


defineProps<{
  data: CatRaffTicketInfoFragment[]
}>()
</script>