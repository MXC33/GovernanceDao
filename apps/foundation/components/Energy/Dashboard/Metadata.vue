<template lang="pug">
div(grid="~ cols-3 gap-6")
  TitleDetail() 
    template(#detail)  {{ $t('energy.DailyIXT.title') }}
    template(#default) test

  TitleDetail() 
    template(#detail) {{ $t('energy.TVL.title') }}
    template(#default) test

  TitleDetail() 
    template(#detail) {{ $t('energy.IXTUnlocked.title') }}
    template(#default) test

  TitleDetail()
    template(#detail) {{ $t('energy.YourStake.title') }}
    template(#default) test

  TitleDetail()
    template(#detail) {{ $t('energy.ClaimableRewards.title') }}
    template(#default) 100


</template>

<script lang="ts" setup>

</script>