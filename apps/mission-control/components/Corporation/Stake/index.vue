<template lang="pug">
CorporationStakeCart(v-if="!isComplete" :stake-type="stakeType" :items="items" @stake="$emit('stake')")
CorporationCompletePage(v-else :action="completeState.action")
</template>

<script lang="ts" setup>
import type { CorporationStakeItem } from '~~/composables/corporations/useCorporationStake';

const { completeState, isComplete, resetComplete } = useCorporationStake()

defineEmits(["stake"])

onUnmounted(() => resetComplete())

defineProps<{
  stakeType: string,
  items: CorporationStakeItem[]
}>()
</script>
  