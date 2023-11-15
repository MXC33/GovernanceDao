<template lang="pug">
HList(space-x="2" justify="between" )
  OptionDropDown(:items="pastTickets" :left="true" z="20")
    template(#selectedName ) 
      div(v-if="selectedWeek") {{ `Week: ${selectedWeek.week} - Amount: ${selectedWeek.amount}` }}

    template(#item="{item}")
      OptionRowSelect(:selected="selectedWeek == item" @click="selectedWeek = item ") {{ `Week: ${item.week} - Amount: ${item.amount}` }}
</template>

<script lang="ts" setup>
import type { StakingDataFragment, WeeklyTicketDataFragment } from '#gql';

const { data } = defineProps<{
  data: StakingDataFragment
}>()

const selectedWeek = defineModel<WeeklyTicketDataFragment>()

const pastTickets = computed(() => data.userSpecificStakingData?.pastWeekTickets as WeeklyTicketDataFragment[])




</script>
