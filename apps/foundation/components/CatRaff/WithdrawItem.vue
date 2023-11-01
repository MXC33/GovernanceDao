<template lang="pug">
Card()
  HList()
    CardTitle(flex-grow space-y="2") 
      template(#default) {{ $t(`ixtCatRaff.withdraw.title`) }}
      template(#detail) {{ $t(`ixtCatRaff.withdraw.description`) }}
    HList(space-x="1")
      div() Available:
      TitleDetail(:icon="'ixt'")
      div() {{totalPastTickets}}

  HList(justify="between")
    CatRaffDropDownItem(:data="data" v-model="week")
    ButtonGlitch(btn="~ primary-outline-cut" @click="onClick" :text="'withdraw'")
</template>

<script lang="ts" setup>
import type { StakingDataFragment, WeeklyTicketDataFragment } from '#gql';

const { withdrawIXT } = useCatRaffStakingContract()

const { data } = defineProps<{
  data: StakingDataFragment
}>();

const week = ref<WeeklyTicketDataFragment>()

const totalPastTickets = computed(() => pastTickets.value.reduce((a, b) => a + b.amount, 0))
const pastTickets = computed(() => data.userSpecificStakingData?.pastWeekTickets as WeeklyTicketDataFragment[])


const onClick = () => {
  if (!week.value)
    return
  return withdrawIXT(week.value)
}

watch(pastTickets, () => {
  console.log(pastTickets.value[0])
  nextTick(() => week.value = pastTickets.value[0])
}, {
  immediate: true,
})
</script>
