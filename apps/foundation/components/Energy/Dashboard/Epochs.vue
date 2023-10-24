<template lang="pug">
div(grid="~ cols-2 gap-6")
  Card() 
    CardTitle()
      template(#default) {{$t("energy.IXTPoolNextEpoch.title") }}
      template(#subtitle) {{$t("energy.Estimated.title") }}


    VList()
      div(text="detail") {{$t("energy.TotalPoolNextEpoch.title") }}

      HList()
        div {{data.nextEpochPool?.toLocaleString()}}
        IXTIcon(w="6" class="ml-2")

  Card()
    CardTitle()
      template(#default) {{$t("energy.NextEpochRelease.title") }}
      template(#subtitle) {{$t("energy.facilitiesMinted.title") }}

    VList()
      div(text="detail") 99.94%

      HList()
        div {{data.nextEpochPool?.toLocaleString()}}
        IXTIcon(w="6" class="ml-2")
        
</template>
  
<script lang="ts" setup>

import type { StakingDataFragment } from '~/.nuxt/gql/default';
import IXTIcon from '~/assets/images/token.svg'


const { data } = defineProps<{
  data: StakingDataFragment
}>()

</script>