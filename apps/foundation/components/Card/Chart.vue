<template lang="pug">
Card()
  VList()
    div()
      TitleDetail()
        template(#default) Wallet portfolio
        template(#detailBottom) Track balances
    ChartBackground()
  div.flex.space-x-20.items() 
    TitleDetail()
      template(#default) Wallet
      template(#detailBottom) 0

    TitleDetail()
      template(#default) Staked
      template(#detailBottom) 0

    TitleDetail()
      template(#default) Withdrawable
      template(#detailBottom) 0

</template>

<script lang="ts" setup>
import ChartBackground from '~/assets/images/Mask_group.svg'


//Details for Chart 
const details = [
  { title: 'Wallet', value: 0 },
  { title: 'Staked', value: 0 },
  { title: 'Withdrawable', value: 0 },
];

</script>