<template lang="pug">
div(grid="~ md:cols-2 gap-default")
  VList(space-y="default")
    Card(flex-grow)
      CardTitle()
        template(#default) {{ $t(`ixtcatraff.TreasuryBalance.title`) }}

      TitleDetail(icon="ixt")
        template(#detail) IXT
        template(#default) {{ stakingData.totalStakedAmount}}

    Card()
      CardTitle()
        template(#default) {{ $t(`ixtcatraff.PoolPrice.title`) }}

      TitleDetail()
        template(#detail) {{ $t(`ixtcatraff.PoolPrice.description`) }}
        template(#default) ${{ ixtToUSD(stakingData.totalStakedAmount ?? 0) }}

  Card()
    CardTitle()
      template(#default) {{ $t(`ixtcatraff.PoolStats.title`) }}

    TitleDetail()
      template(#detail)  {{ $t(`ixtcatraff.CurrentWeekDeposits.title`) }}
      template(#default)
        div(space-x="1")
          span {{ stakingData.userSpecificStakingData?.currentWeekTickets?.amount }} IXT
          span (${{ ixtToUSD(stakingData.userSpecificStakingData?.currentWeekTickets?.amount ?? 0) }})

    TitleDetail()
      template(#detail) {{ $t(`ixtcatraff.TotalWeekDeposits.title`) }}
      template(#default) {{currentWeekDeposits}} IXT
</template>

<script lang="ts" setup>
import type { StakingDataFragment, CatRaffTicketInfoFragment } from '#gql';
const { ixtToUSD } = useCurrencyConversion()


const { stakingData, weeklyData } = defineProps<{
  stakingData: StakingDataFragment
  weeklyData: CatRaffTicketInfoFragment[]
}>()

const currentWeekDeposits = computed(() => (weeklyData && weeklyData[weeklyData.length - 1].totalTickets) ?? 0)

</script>