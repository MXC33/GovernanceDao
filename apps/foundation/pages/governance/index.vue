<template lang="pug">
Page()

  PageSection(section="overview" :primary="true")
    HList(space-x="6")
      Card()
        GovernanceRegisterMember()
        GovernanceSelectItem(v-for="item in selectItems" :key="item" :isSelected="stakeSort == item" :id="item" @click="stakeSort = item")


      GovernanceCard(:id="stakeSort")

      


</template>

<script lang="ts" setup>
const stakeSort = ref("proposal");

const selectItems = [
  "proposal",
  "newProposal",
  "votingPower",
  "ixtStaking",
  // "discussion",
  // "newDiscussion",
  // "delegate",
];
</script>
