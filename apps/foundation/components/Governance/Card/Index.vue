<template lang="pug">
GovernanceCardProposal(v-if="id === 'proposal' ")
GovernanceCardNewProposal(v-if="id === 'newProposal' ")
GovernanceCardVotingPower(v-if="id === 'votingPower' ")
GovernanceCardStaking(v-if="id === 'ixtStaking' ")

</template>

<script lang="ts" setup>
const { id } = defineProps<{
  id: "proposal" | "newProposal" | "votingPower" | "ixtStaking";
}>();
</script>
