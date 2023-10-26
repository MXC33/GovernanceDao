<template lang="pug">
Card()
  SimpleTable(:rows="rows" :columns="columns" mx="-6" mt="-6")
    template(#col-asset="{index}")
      HList(space-x="3" items="center")
        img(:src="'/assets/metashare/' + data.stakingItems[index]?.token.tokenInfo?.tier + '.svg'" w="12" class="lg:block hidden")
        div {{ data.stakingItems[index]?.token.tokenInfo?.title }}

    template(#footer-col-asset) 
      span( text="gray-300") Total

    template(#footer-col-daily) 
      HList(items="center" space-x="1" font="bold")
        div {{ roundToDecimals(totalDaily) }}
        Icon(icon="ixt")

    template(#footer-col-30days) 
      HList(items="center" space-x="1" font="bold")
        div {{ roundToDecimals(totalThirty) }}
        Icon(icon="ixt")

  HList(bg="black" p="x-6 y-3" items="center" mx="-6" space-x="3" mb="!-6" mt="!0")
    h3(text="subheading" flex-grow="1") Total Rewards
    div(text="subheading") {{ roundToDecimals(data.userSpecificStakingData?.totalUserReward) }}
    Icon(icon="ixt")
    ButtonGlitch(btn="~ primary-outline-cut" :text="$t('general.claimAll')")

</template>

<script lang="ts" setup>
import type { StakingDataFragment } from '#gql';
import type { SimpleTableRow, SimpleTableColumn } from '@ix/base/composables/useSimpleTable';
import IXTIcon from '~/assets/images/token.svg'

const { data } = defineProps<{
  data: StakingDataFragment
}>()

const rows = computed<SimpleTableRow[]>(() =>
  data.stakingItems.map((item) => ({
    items: [
      item?.token.tokenInfo?.title,
      item?.userStakingData?.amountStaked ?? 0,
      roundToDecimals(item?.userStakingData?.userRewardPerDay, 5),
      roundToDecimals(item?.userStakingData?.userRewardPerThirtyDays, 5)
    ]
  }))
)
const columns: SimpleTableColumn[] = [
  { title: "Asset", id: "asset", width: 300 },
  { title: "Amount Staked", id: "amount" },
  { title: "24h", id: "daily" },
  { title: "30 days", id: "30days" },
]

const totalDaily = computed(() => data.userSpecificStakingData?.totalUserRewardPerDay)

const totalThirty = computed(() => data.userSpecificStakingData?.totalUserRewardPerThirtyDays)


</script>