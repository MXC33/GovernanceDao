<template lang="pug">
Card(class="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300")
  h3(class="text-lg text-black-900 font-medium mb-2") {{ proposal.title }}
  p(class="text-sm text-gray-600 mb-4") {{ proposal.description }}
  div(class="flex flex-wrap gap-4 mt-4 text-xs text-gray-400")
    //- div
    //-   span(class="font-bold") Status:
    //-   //- span {{ proposal.status | capitalize }}
    //- div
    //-   span(class="font-bold") Result:
    //-   //- span {{ proposal.result | capitalize }}
    //- div
    //-   span(class="font-bold") Replies:
    //-   span {{ proposal.replies }}
    div
      span(class="font-bold") Proposal Number:
      span {{ Number(proposal.id) + 1 }}
    div
      span(class="font-bold") Created At:
      span {{ formatDate(proposal.createdTime) }}
    div(v-if="proposal.isVoted")
      span You have voted on this proposal.
    div(v-if="proposal.isModerator")
      span(class="font-bold text-green-500") Moderator Proposal
    div
      span(class="font-bold") Total Votes:
      span {{ totalVotesCount }}
    div
      span(class="font-bold") Yes Votes:
      span {{ yesVotesCount }}
    div
      span(class="font-bold") No Votes:
      span {{ noVotesCount }}
    div
      span(class="font-bold") Power2:
      span {{ proposal.power2 }}
    div
      span(class="font-bold") Power1:
      span {{ proposal.power1 }}
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
    power2: string; // Assuming these are also large numbers
    power1: string; // Assuming these are also large numbers
    isVoted: boolean;
    isModerator: boolean;
    createdTime: string;
    votes: {
      status: string;
      id: number;
      amount: string; // This should be a string if it's a large number
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
  const weiPerEther = BigInt(10 ** 18);
  return props.proposal.votes
    .reduce((total, vote) => {
      return total + BigInt(vote.amount) / weiPerEther;
    }, BigInt(0))
    .toString();
});

const totalVotesCount = computed(() => {
  return props.proposal.votes.length;
});

const yesVotesCount = computed(() => {
  // Assuming `true` represents a 'Yes' vote
  return props.proposal.votes.filter((vote) => vote.status === true).length;
});

const noVotesCount = computed(() => {
  // Assuming `false` represents a 'No' vote
  return props.proposal.votes.filter((vote) => vote.status === false).length;
});

const formatDate = (value: string) => {
  if (!value) return "";
  const date = new Date(parseInt(value) * 1000); // Assuming the value is a Unix timestamp
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Add the voting function here
</script>
