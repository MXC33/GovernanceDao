<template lang="pug">
Card()
  HList()
    CardTitle(flex-grow space-y="2") 
      template(#default) {{ $t(`ixtCatRaff.ticket.title`) }}
      template(#detail) {{ $t(`ixtCatRaff.ticket.description`) }}
    HList(space-x="1")
      div() Available:
      TitleDetail()
      div() {{totalPastTickets}}


  HList(justify="between")
    CatRaffDropDownItem(:data="data" v-model="week")
    ButtonGlitch(btn="~ primary-outline-cut" @click="onClick" :text="'ADD TICKETS'")
</template>

<script lang="ts" setup>
import type { StakingDataFragment, WeeklyTicketDataFragment } from '#gql';

const { addOldTickets } = useCatRaffStakingContract()

const { data } = defineProps<{
  data: StakingDataFragment
}>()


const totalPastTickets = computed(() => pastTickets.value.reduce((a, b) => a + b.amount, 0))
const pastTickets = computed(() => data.userSpecificStakingData?.pastWeekTickets as WeeklyTicketDataFragment[])

const week = ref<WeeklyTicketDataFragment>(pastTickets.value[0])


const onClick = () => {
  if (!week.value)
    return
  return addOldTickets(week.value)
}


watch(pastTickets, () => {
  console.log(pastTickets.value[0])
  nextTick(() => week.value = pastTickets.value[0])
}, {
  immediate: true,
})
</script>
