<template lang="pug">
div(grid="~ cols-2 gap-3")
  Card()
    div
      h3(text-2xl font-bold) USDT/IXT LP Staking
      p(text="ix-orange") Provide liquidity on DEX and Stake LP
      img(src="~/assets/images/usdt_ix.svg")
    HList(space-x="10")
      TitleDetail() 
        template(#detail) Total liquidity
        template(#default) $1
      TitleDetail() 
        template(#detail) Your Stake
        template(#default) 0.00
      TitleDetail()
        template(#detail) Your 5-day ROI%
        template(#default) 0
      TitleDetail()
        template(#detail) LP Tokens 
        template(#default) 0.00
      TitleDetail()
        template(#detail) APY
        template(#default) 26%
    HList(gap-6)
      button(btn="~ primary-outline disabled") Withdraw 
      button(btn="~ primary-outline disabled") Deposit
    template(#detailBottom)
      ClaimHorizontal()
  Card()
    div
      h3(text-2xl font-bold) MATIC/IXT LP Staking
      p(text="ix-orange") Provide liquidity on DEX and Stake LP
      img(src="~/assets/images/usdt_ix.svg")
    HList(space-x="10")
      TitleDetail() 
        template(#detail) Total liquidity
        template(#default) $1
      TitleDetail() 
        template(#detail) Your Stake
        template(#default) 0.00
      TitleDetail()
        template(#detail) Your 5-day ROI%
        template(#default) 0
      TitleDetail()
        template(#detail) LP Tokens 
        template(#default) 0.00
      TitleDetail()
        template(#detail) APY
        template(#default) 26%
    HList(gap-6)
      button(btn="~ primary-outline disabled") Withdraw 
      button(btn="~ primary-outline disabled") Deposit
    template(#detailBottom)
      ClaimHorizontal()
</template>

<script lang="ts" setup>

</script>