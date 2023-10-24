<template lang="pug">
div(grid="~ md:cols-2 gap-6")
  StakingItem()
    template(#title) {{ $t('index.usdtIxtStaking') }}
    template(#subtitle) {{ $t('index.provideLiq') }}
    template(#metadata)
      HomepageStakingLpMetadata(:item="lpUsdtData" v-if="lpUsdtData")
    template(#detail)
      HList(flex-grow="1")
        TitleDetail(flex-grow="1")
          template(#detail) Claim Rewards
          template(#default) 0
        ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('withdraw')" :text="$t('general.claim')")

  StakingItem()
    template(#title) {{ $t('index.maticIxtStaking') }}
    template(#subtitle) {{ $t('index.provideLiq') }}
    template(#metadata)
      HomepageStakingLpMetadata(:item="lpMaticData" v-if="lpMaticData")
    template(#detail)
      HList(flex-grow="1")
        TitleDetail(flex-grow="1")
          template(#detail) Claim Rewards
          template(#default) 0
        ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('withdraw')" :text="$t('general.claim')")
</template>

<script lang="ts" setup>
import { StakingId } from '~/.nuxt/gql/default';

const { data: lpMaticData } = useStakingData(StakingId.LpMATIC)
const { data: lpUsdtData } = useStakingData(StakingId.LpUSDT)

</script>