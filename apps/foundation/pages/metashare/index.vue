<template lang="pug">
Page()
  PageSection(section="StakingTitle" :primary="true")
    MetashareTable(:data="data" v-if="data")

  PageSection(section="CorporationTitle")
    div(grid="~ md:cols-2 gap-6" v-if="data")
      template(v-for="item in data.stakingItems")
        MetashareCorporationItem(:data="item" v-if="item")

</template>

<script lang="ts" setup>
import { StakingId } from '../../.nuxt/gql/default'

const { data } = useStakingData(StakingId.Metashare)

</script>