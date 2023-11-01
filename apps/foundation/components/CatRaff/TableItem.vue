<template lang="pug">
Card(flex-grow="1")
  HList(justify="between")
    slot(name="details")
  HList(v-for="item in data" justify="between")
    div() {{ minimizeString(item.address ?? "") }}
    div() {{ item.winAmount ?? item.totalTickets }}
  
  
  
</template>

<script lang="ts" setup>
import type { CatRaffTicketInfoFragment } from '#gql';
import { minimizeString } from '@ix/base/composables/Utils/useHelpers';


const { } = defineProps<{
  data: CatRaffTicketInfoFragment[]
}>()
</script>