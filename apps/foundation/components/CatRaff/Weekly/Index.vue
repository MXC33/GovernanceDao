<template lang="pug">
div(overflow-x="auto" whitespace-nowrap)
  div(inline="flex" space-x="6" flex-row-reverse)
    div(v-for="(week, index) in data "  w="300px") 
      Card()
        VList()
          TitleDetail(#default mb="6") Week # {{week.week}}
          TitleDetail(#detail) Thursday
          TitleDetail(#detail) {{ calculateEndDate(index) }}
          TitleDetail(#detail) 2500 IXT
        template(#detailBottom)
          VList()
            div(grid="~ cols-2")
              div()
                TitleDetail(#default) {{ week.totalTickets }}
                TitleDetail(#detail) Total Tickets
              div()
                TitleDetail(#default) {{week.userEnteredTicket}}
                TitleDetail(#detail) Your Tickets
</template>
	
<script lang="ts" setup>
import { type CatRaffTicketInfoFragment } from '#gql';
import { defineProps } from 'vue';
import { format } from 'date-fns';

const startDate = 1657670400000
const sevenDaysSeconds = 604800000


const calculateEndDate = (index: number) => format(startDate + (sevenDaysSeconds * index + 1), 'dd-MM-yyyy')


defineProps<{
  data: CatRaffTicketInfoFragment[]
}>()
</script>
