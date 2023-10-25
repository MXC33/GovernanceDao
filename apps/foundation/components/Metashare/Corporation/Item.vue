<template lang="pug">
Card()

  div(grid="~ cols-3" mx="-6" mt="-6" bg="black")
    TokenMedia(:token="data.token" h="60" pos="relative")

    VList(grid="col-span-2" items="center" justify="center" ) 
      img(:src="'/assets/metashare/' + data.token.tokenInfo?.tier + '-title.png'" h="auto" max-w="64")

  MetashareTrade(:staking-item="data")

  Divider(mx="-6")

  MetashareStake(:item="data")

  Divider(mx="-6")

  VList(space-y="3")
    CardTitle(:large="true") {{ $t('foundation.claimRewards') }}
    TitleDetail(icon="ixt") 
      template(#detail) {{ $t('general.rewards') }}
      template(#default) 0.00

    ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('withdraw')" :text="$t('general.claim')")
</template>

<script lang="ts" setup>
import type { StakingItemFragment } from '#gql'

const { data } = defineProps<{
  data: StakingItemFragment
}>()
</script>