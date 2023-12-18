<template lang="pug">
Card
  HList(space-x="6")
    PageSection(section="votingPower")
  HList(justify="between")
  div(class="voting-power-display flex justify-between items-center mt-4")
    div
      span(class="text-label") Total Voting Power:
      span(class="text-value") {{ totalVotingPower }}
    div
      span(class="text-label") Tokens Staked:
      span(class="text-value") {{ stakedTokens }}

  // Recent Voting Activity
  div(class="recent-voting-activity mt-6")
    h3(class="text-lg font-bold mb-3") Recent Voting Activity
    ul(class="recent-votes-list")
      li(v-for="vote in recentVotes" :key="vote.id" class="mb-2")
        div
          span(class="vote-title font-semibold") {{ vote.proposal.title }}
          span(class="vote-date text-sm text-gray-500") {{ new Date(vote.date).toLocaleDateString() }}
          span(class="vote-result font-semibold" :class="{ 'text-green-500': vote.result === 'Yes', 'text-red-500': vote.result === 'No' }") {{ vote.result }}
</template>

<script lang="ts" setup>
import { ref } from "vue";

const totalVotingPower = ref(1234); // Replace with actual data
const stakedTokens = ref(5678); // Replace with actual data
const recentVotes = ref([
  // Replace with actual data fetched from your API
  {
    id: 1,
    proposal: { title: "Improve UX Design" },
    date: "2023-01-01T12:00:00Z",
    result: "Yes",
  },
  // ... more votes
]);
</script>
