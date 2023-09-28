<template lang="pug">
InfoTableRow(text="gray_50 xs left")
  InfoTableColumn() 
    TokenName(:token="props.token.token")

  InfoTableRow()

    InfoTableColumn() x{{ defaultAmount }}
    InfoTableColumn() {{ probability.toFixed(2) }}%

  template(#right) {{ defaultAmount }}
</template>

<script setup lang="ts">
import type { TokenProbabilityFragment } from '#gql'


const defaultAmount = computed(() => {
  switch (props.token.token.tokenInfo.type) {
    case 'anniversary-pack': return 1
    case 'metashare': return 1
    case 'loot-crate': return 1
    default: return props.token.token.balance
  }
})

const probability = computed(() => (props.token.probability ?? 1) * 100)


const props = defineProps<{
  token: TokenProbabilityFragment,
}>()
</script>