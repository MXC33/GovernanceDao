<template lang="pug">
Card()
  VList()
    div()
      TitleDetail(flex-col-reverse)
        template(#default) 
          h3() Staking Pool Distribution

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