<template lang="pug">
CorporationBurnExecute(v-if="!isComplete" :available-tokens="availableTokens")
CorporationCompletePage(v-else)

</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql';

const { isComplete, activeBurnItem } = useCorporationBurn()
defineProps<{
  availableTokens: NftFragment[]
}>()

activeBurnItem.value = null
</script>
