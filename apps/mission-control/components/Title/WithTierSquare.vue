<template lang="pug">
div(flex="~ row" items="center" space-x="2")
  div(w="0.75em" aspect="square" :bg="'tier-' + color")
  div(flex="~ col")
    p(:color="'tier-' + color" uppercase="~" translate-y="0.4") 
      slot

</template>

<script setup lang="ts">
import type { TierId } from '~~/composables/NFTs/tiers';

const props = defineProps<{
  tier: TierId
}>()

const color = computed(() => getTierColor(props.tier))
</script>
