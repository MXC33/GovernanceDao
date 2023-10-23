<template lang="pug">
HomepageStakingItem()
  template(#title) {{ month }} {{ $t('general.month', month) }}
  template(#metadata)
    HomepageStakingIxtMetadata(:pool="pool")

</template>


<script lang="ts" setup>
import type { StakingDataFragment } from '#gql';

const { pool } = defineProps<{
  pool: StakingDataFragment,
  month: number
}>()

</script>