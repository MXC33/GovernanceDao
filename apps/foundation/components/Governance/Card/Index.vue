<template lang="pug">
GovernanceCardProposal(v-if="id== 'proposal'")
</template>

<script lang="ts" setup>

const { id } = defineProps<{
  id: 'proposal' | 'newProposal' | 'discussion' | 'newDiscussion' | 'votingPower' | 'ixtStaking' | 'delegate'
}>()
</script>