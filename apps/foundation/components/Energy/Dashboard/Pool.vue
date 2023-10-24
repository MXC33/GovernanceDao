<template lang="pug">
VList()
  VList(flex-grow="1" justify="center" items="center")
    img(src="~/assets/png/EnergyIcon.png" w="32")

  Card()
    CardTitle()
      template(#default) {{$t("energy.EnergyPool.title") }}
      template(#subtitle) {{$t("energy.EpochEnds.title") }} 

    EnergyDashboardMetadata()

    template(#detailBottom)
      ButtonGlitch(btn="~ primary-outline" cut="~ bottom-right b-ix-primary" @click="$emit('withdraw')" :text="$t('energy.ChooseStakingPool')")

</template>
  
<script lang="ts" setup>

import IXTIcon from '~/assets/images/token.svg'

</script>