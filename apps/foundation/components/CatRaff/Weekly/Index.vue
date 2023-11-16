<template lang="pug">
HList(overflow-x="auto" whitespace-nowrap space-x="6")
  Card(v-for="(week, index) in reversedItems" w="300px" flex-shrink="0") 
    VList()
      TitleDetail(#default mb="6") Week # {{week.week}}
      TitleDetail(#detail) Thursday
      TitleDetail(#detail) {{ calculateEndDate(week.week) }}
      TitleDetail(#detail) 00:00 AM GMT
      TitleDetail(#detail) 2500 IXT
    template(#detailBottom)
      VList()
        div(grid="~ cols-2")
          div()
            TitleDetail(#default) {{ week.totalTickets?.toLocaleString() }}
            TitleDetail(#detail) Total Tickets
          div()
            TitleDetail(#default) {{week.userEnteredTicket}}
            TitleDetail(#detail) Your Tickets
</template>
	
<script lang="ts" setup>
import { type CatRaffTicketInfoFragment } from '#gql';

const { data } = defineProps<{
  data: CatRaffTicketInfoFragment[]
}>()

const reversedItems = computed(() => [...data].reverse())

</script>
