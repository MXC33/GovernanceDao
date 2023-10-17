<template lang="pug">
Card()
  VList()
    div()
      TitleDetail(flex-col-reverse)
        template(#default) 
          h3() Wallet portfolio
        template(#detail)
          h4() Track balances
    div()
      ChartIcon(w="lg")
  div.flex.gap-20(b="0.5 white opacity-20") 
    TitleDetail(flex-col-reverse)
      template(#default)
        ul()
          li() Wallet
      template(#detail)
        ul()
          li() 0

    TitleDetail(flex-col-reverse)
      template(#default)
        ul()
          li() Staked
      template(#detail)
        ul()
          li() 0

    TitleDetail(flex-col-reverse)
      template(#default)
        ul()
          li() Withdrawable
      template(#detail)
        ul()
          li() 0

</template>

<script lang="ts" setup>
import ChartIcon from '~/assets/images/Mask_group.svg'


//Details for Chart 
const details = [
  { title: 'Wallet', value: 0 },
  { title: 'Staked', value: 0 },
  { title: 'Withdrawable', value: 0 },
];

</script>