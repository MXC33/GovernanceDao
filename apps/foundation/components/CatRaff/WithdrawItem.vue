<template lang="pug">
CatRaffItem()
  template(#title) {{ $t(`ixtcatraff.withdraw.title`) }}
  template(#description) {{ $t(`ixtcatraff.withdraw.description`) }}
  template(#counter)
    HList(space-x="1")
      div() Available:
      TitleDetail(:icon="'ixt'")
      div() {{totalPastTickets}}

  template(#footer)
    HList(justify="between" v-if="pastTickets && week")
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

const totalPastTickets = computed(() => pastTickets.value ? pastTickets.value.reduce((a, b) => a + (b.amount ?? 0), 0) : 0)
const pastTickets = computed(() => data.userSpecificStakingData?.pastWeekTickets as WeeklyTicketDataFragment[])


const onClick = () => {
  if (!week.value)
    return
  return withdrawIXT(week.value)
}

watch(pastTickets, () => {
  if (!pastTickets.value)
    return
  nextTick(() => week.value = pastTickets.value[0])
}, {
  immediate: true,
})
</script>
