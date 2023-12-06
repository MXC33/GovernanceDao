<template lang="pug">
GovernanceCardProposal(v-if="id === 'proposal' ")
GovernanceCardNewProposal(v-if="id === 'newProposal' ")
GovernanceCardDiscussion(v-if="id === 'discussion' ")
GovernanceCardNewDiscussion(v-if="id === 'newDiscussion' ")
GovernanceCardVotingPower(v-if="id === 'votingPower' ")
GovernanceCardIxtStaking(v-if="id === 'ixtStaking' ")
GovernanceCardDelegate(v-if="id === 'delegate' ")
</template>

<script lang="ts" setup>
const { id } = defineProps<{
  id:
    | "proposal"
    | "newProposal"
    | "discussion"
    | "newDiscussion"
    | "votingPower"
    | "ixtStaking"
    | "delegate";
}>();
</script>
