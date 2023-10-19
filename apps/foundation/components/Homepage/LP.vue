<template lang="pug">
div(grid="~ cols-2 gap-3")
  Card()
    div
      div(text-2xl font-bold) 
        PageParagraphs(section="usdtIxtStaking")
      div(text="ix-orange") Provide liquidity on DEX and Stake LP
      img(src="~/assets/images/usdt_ix.svg")
    HList(space-x="10")
      TitleDetail() 
        template(#detail) 
          PageParagraphs(section="totalLiquidity")
        template(#default) $1
      TitleDetail() 
        template(#detail)
          PageParagraphs(section="yourStake")
        template(#default) 0.00
      TitleDetail()
        template(#detail)
          PageParagraphs(section="fiveDayRoi")
        template(#default) 0
      TitleDetail()
        template(#detail)
          PageParagraphs(section="lpTokens")
        template(#default) 0.00
      TitleDetail()
        template(#detail)
          PageParagraphs(section="apy")
        template(#default) 26%
    HList(gap-6)
      button(btn="~ primary-outline disabled") 
        PageParagraphs(section="withdrawBtn")
      button(btn="~ primary-outline disabled")
        PageParagraphs(section="depositBtn")
    template(#detailBottom)
      ClaimHorizontal()
  Card()
    div(text-2xl font-bold)
      PageParagraphs(section="maticIxtStaking")
    p(text="ix-orange") Provide liquidity on DEX and Stake LP
    img(src="~/assets/images/usdt_ix.svg")
  HList(space-x="10")
    TitleDetail() 
      template(#detail) 
        PageParagraphs(section="totalLiquidity")
      template(#default) $1
    TitleDetail() 
      template(#detail)
        PageParagraphs(section="yourStake")
      template(#default) 0.00
    TitleDetail()
      template(#detail)
        PageParagraphs(section="fiveDayRoi")
      template(#default) 0
    TitleDetail()
      template(#detail)
        PageParagraphs(section="lpTokens")
      template(#default) 0.00
    TitleDetail()
      template(#detail)
        PageParagraphs(section="apy")
      template(#default) 26%
  HList(gap-6)
    button(btn="~ primary-outline disabled") 
      PageParagraphs(section="withdrawBtn")
    button(btn="~ primary-outline disabled")
      PageParagraphs(section="depositBtn")
  template(#detailBottom)
    ClaimHorizontal()
</template>

<script lang="ts" setup>

</script>