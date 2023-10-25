<template lang="pug">
div(grid="~ cols-2 gap-6")
  Card() 
    CardTitle()
      template(#default) {{$t("energy.IXTPoolNextEpoch") }}
      template(#subtitle) {{$t("general.estimated") }}


    VList()
      TitleDetail(icon="ixt")
        template(#detail) {{$t("energy.TotalPoolNextEpoch") }}
        template(#default) {{data.nextEpochPool?.toLocaleString()}}

  Card()
    CardTitle()
      template(#default) {{$t("energy.NextEpochRelease") }}
      template(#subtitle) {{$t("energy.facilitiesMinted") }}

    TitleDetail(icon="ixt")
      template(#detail) 99.94%
      template(#default) {{data.nextEpochPool?.toLocaleString()}}
        
</template>
  
<script lang="ts" setup>

import type { StakingDataFragment } from '~/.nuxt/gql/default';


const { data } = defineProps<{
  data: StakingDataFragment
}>()

</script>