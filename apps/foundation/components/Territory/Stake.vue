<template lang="pug">
VList(space-y="3")
  HList(space-x="3")
    TitleDetail()
      template(#detail) Staked since
      template(#default) {{ formattedDate }}

  div(grid="~ cols-2" space-x="3")
    ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('stake')" :text="$t('general.stake')")
    ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('unstake')" :text="$t('general.unstake')")

</template>
<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';
import { format } from 'date-fns'

const { item } = defineProps<{
  item: StakingItemFragment
}>()


const formattedDate = computed(() => format(item.userStakingData?.stakedAt * 1000 ?? 0, 'dd-MM-yyyy'))


</script>