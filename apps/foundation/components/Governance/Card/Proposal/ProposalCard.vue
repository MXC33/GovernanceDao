<template lang="pug">
Card(class="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300")
  h3(class="text-lg text-black-900 font-medium mb-2") {{ proposal.title }}
  p(class="text-sm text-gray-600 mb-4") {{ proposal.description }}
  div(class="flex flex-wrap gap-4 mt-4 text-xs text-gray-400")
    div
      span(class="font-bold") Status:
      span {{ proposal.status | capitalize }}
    div
      span(class="font-bold") Result:
      span {{ proposal.result | capitalize }}
    div
      span(class="font-bold") Replies:
      span {{ proposal.replies }}
    div
      span(class="font-bold") Power2:
      span {{ proposal.power2 }}
    div
      span(class="font-bold") Power1:
      span {{ proposal.power1 }}
    div
      span(class="font-bold") Created At:
      span {{ formatDate(proposal.createdTime) }}
    div(v-if="proposal.isVoted")
      span You have voted on this proposal.
    div(v-if="proposal.isModerator")
      span(class="font-bold text-green-500") Moderator Proposal
    div
      span(class="font-bold") Total Votes:
      span {{ totalVotesAmount }}
  div(class="flex justify-end space-x-2 mt-4")
    ButtonGlitch(btn="~ secondary-outline-cut" text="Vote Yes" @click="vote('yes')")
    ButtonGlitch(btn="~ secondary-outline-cut" text="Vote No" @click="vote('no')")
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";

const props = defineProps<{
  proposal: {
    id: number;
    title: string;
    description: string;
    status: string;
    result: string;
    replies: number;
    power2: number;
    power1: number;
    isVoted: boolean;
    isModerator: boolean;
    createdTime: string;
    votes: {
      status: string;
      id: number;
      amount: number;
      account: {
        id: string;
      };
    }[];
    creator: {
      id: string;
    };
  };
}>();

const totalVotesAmount = computed(() => {
  return props.proposal.votes.reduce((total, vote) => total + vote.amount, 0);
});

const formatDate = (value: string) => {
  if (!value) return "";
  const date = new Date(value);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Add the voting function here
</script>
