<template lang="pug">
CatRaffItem()
  template(#title) {{ $t(`ixtcatraff.ticket.title`) }}
  template(#description) {{ $t(`ixtcatraff.ticket.description`) }}
  template(#counter)
    HList(space-x="1")
      div() Available:
      TitleDetail()
      div() {{totalPastTickets}}


  template(#footer)
    HList(justify="between" v-if="pastTickets && week")
      CatRaffDropDownItem(:data="data" v-model="week")
      ButtonGlitch(btn="~ primary-outline-cut" @click="onClick" :text="'ADD TICKETS'")
</template>

<script lang="ts" setup>
import type { StakingDataFragment, WeeklyTicketDataFragment } from '#gql';

const { addOldTickets } = useCatRaffStakingContract()

const { data } = defineProps<{
  data: StakingDataFragment
}>()


const totalPastTickets = computed(() => pastTickets.value ? pastTickets.value.reduce((a, b) => a + (b.amount ?? 0), 0) : 0)
const pastTickets = computed(() => data.userSpecificStakingData?.pastWeekTickets as WeeklyTicketDataFragment[])

const week = ref<WeeklyTicketDataFragment | null>(pastTickets.value ? pastTickets.value[0] : null)


const onClick = () => {
  if (!week.value)
    return
  return addOldTickets(week.value)
}


watch(pastTickets, () => {
  if (!pastTickets.value)
    return
  nextTick(() => week.value = pastTickets.value[0])
}, {
  immediate: true,
})
</script>
