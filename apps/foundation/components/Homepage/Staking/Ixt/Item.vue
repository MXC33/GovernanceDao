<template lang="pug">
StakingItem()
  template(#title) {{ month }} {{ $t('general.month', month) }}
  template(#metadata)
    HomepageStakingIxtMetadata(:pool="pool")
  template(#detail)
    ClaimHorizontal()

</template>


<script lang="ts" setup>
import type { StakingDataFragment } from '#gql';

const { pool } = defineProps<{
  pool: StakingDataFragment,
  month: number
}>()



</script>