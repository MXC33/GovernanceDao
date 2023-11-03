<template lang="pug">

HList()
  CardTitle()
    template(#default) Prize portfolio
    template(#detail) Track balances

  CardTitle()
    template(#default) Price
    template(#detail) $0.082241

ChartBackground()

div(grid="~ cols-4 gap-3")
  TitleDetail()
    template(#detail) Total deposit
    template(#default) 0

  TitleDetail()
    template(#detail) Staked
    template(#default) 0

  TitleDetail()
    template(#detail) Withdrawable
    template(#default) 0

  TitleDetail()
    template(#detail) Next draw
    template(#default) x days

</template>

<script lang="ts" setup>
import ChartBackground from '~/assets/images/Mask_group.svg'


</script>