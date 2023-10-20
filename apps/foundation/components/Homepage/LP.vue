<template lang="pug">
div(grid="~ cols-2 gap-3")
  Card()
    div
      div(text-2xl font-bold) 
        PageParagraphs(section="usdtIxtStaking")
      PageParagraphs(text="ix-orange" section="provideLiq")
        // img(src="~/assets/images/usdt_ix.svg")
    HList(space-x="10")
      TitleDetail() 
        template(#detail) 
          PageParagraphs(section="totalLiquidity")
        template(#default) ${{lpUsdtData?.totalStakedAmount}}
      TitleDetail() 
        template(#detail)
          PageParagraphs(section="yourStake")
        template(#default) {{lpUsdtData?.stakingItems[0]?.userStakingData?.amountStaked}}
      TitleDetail()
        template(#detail)
          PageParagraphs(section="fiveDayRoi")
        template(#default) 
      TitleDetail()
        template(#detail)
          PageParagraphs(section="lpTokens")
        template(#default) {{lpUsdtData?.stakingItems[0]?.userStakingData?.balanceOfToken}}
      TitleDetail()
        template(#detail)
          PageParagraphs(section="apy")
        template(#default) 26%
    HList(gap-6)
      button(btn="~ tertiary disabled") 
        PageParagraphs(section="withdrawBtn")
      button(btn="~ tertiary disabled")
        PageParagraphs(section="depositBtn")
    template(#detailBottom)
      ClaimHorizontal()
  Card()
    div()
      div(text-2xl font-bold)
        PageParagraphs(section="maticIxtStaking")
      PageParagraphs(text="ix-orange" section="provideLiq")
        // img(src="~/assets/images/usdt_ix.svg")
    HList(space-x="10")
      TitleDetail() 
        template(#detail) 
          PageParagraphs(section="totalLiquidity")
        template(#default) {{lpMaticData?.totalStakedAmount}}
      TitleDetail() 
        template(#detail)
          PageParagraphs(section="yourStake")
        template(#default) {{lpMaticData?.stakingItems[0]?.userStakingData?.amountStaked}}
      TitleDetail()
        template(#detail)
          PageParagraphs(section="fiveDayRoi")
        template(#default) 0
      TitleDetail()
        template(#detail)
          PageParagraphs(section="lpTokens")
        template(#default) {{lpMaticData?.stakingItems[0]?.userStakingData?.balanceOfToken}}
      TitleDetail()
        template(#detail)
          PageParagraphs(section="apy")
        template(#default) 26%
    HList(gap-6)
      button(btn="~ tertiary disabled") 
        PageParagraphs(section="withdrawBtn")
      button(btn="~ tertiary disabled")
        PageParagraphs(section="depositBtn")
    template(#detailBottom)
      ClaimHorizontal()
</template>

<script lang="ts" setup>
import { StakingId } from '~/.nuxt/gql/default';



const { data: lpMaticData } = useStakingData(StakingId.LpMATIC)
const { data: lpUsdtData } = useStakingData(StakingId.LpUSDT)



</script>