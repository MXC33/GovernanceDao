<template lang="pug">
DefaultBadgeIcon.territory-badge(:class="[`is-${tier}`]" w="4" translate-y="-0.5")
</template>

<script lang="ts" setup>

import DefaultBadgeIcon from '~/assets/images/outlier-badge.svg'

defineProps<{
  tier: string
}>()
</script>


<style>
.territory-badge.is-legendary path {
  fill: #FFAB00;
  stroke: #FFAB00;
}

.territory-badge.is-rare path {
  fill: #A54BBC;
  stroke: #A54BBC;
}

.territory-badge.is-uncommon path {
  fill: #4057F8;
  stroke: #4057F8;
}

.territory-badge.is-common path {
  fill: #009436;
  stroke: #009436;
}
</style>