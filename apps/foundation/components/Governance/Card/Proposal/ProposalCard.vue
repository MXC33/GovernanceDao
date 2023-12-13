<template lang="pug">
Card(class="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300")
  h3(class="text-lg text-white-900 font-medium mb-2") {{ proposal.title }}
  p(class="text-sm text-gray-300 mb-4") {{ proposal.description }}
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
      span(class="font-bold") Total Votes:
      span {{ totalVotesAmount }}
    div
      span(class="font-bold") Created At:
      span {{ proposal.createdTime | formatDate }}
    div(v-if="proposal.isVoted")
      span You have voted on this proposal.
    div(v-if="proposal.isModerator")
      span(class="font-bold text-green-500") Moderator Proposal
  div(class="flex justify-end space-x-2 mt-4")
    ButtonGlitch(btn="~ secondary-outline-cut" text="Vote Yes" @click="voteYes(proposal.id)")
    ButtonGlitch(btn="~ secondary-outline-cut" text="Vote No" @click="voteNo(proposal.id)")
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps<{
  proposal: {
    id: number;
    title: string;
    description: string;
    status: string;
    result: string;
    replies: number;
    votes: {
      status: string;
      id: number;
      amount: number;
      account: {
        id: string;
      };
    }[];
    isVoted: boolean;
    isModerator: boolean;
    createdTime: string;
    creator: {
      id: string;
    };
  };
}>();

const totalVotesAmount = computed(() => {
  return props.proposal.votes.reduce((total, vote) => total + vote.amount, 0);
});

const emit = defineEmits(["vote"]);

const voteYes = (proposalId: number) => {
  // Logic to handle voting yes
  emit("vote", { proposalId, vote: "yes" });
};

const voteNo = (proposalId: number) => {
  // Logic to handle voting no
  emit("vote", { proposalId, vote: "no" });
};

// Filters
const capitalize = (value: string) => {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const formatDate = (value: string) => {
  if (!value) return "";
  const date = new Date(value);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>
