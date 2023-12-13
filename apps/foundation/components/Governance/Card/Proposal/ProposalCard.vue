<template lang="pug">
Card(class="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300")
  h3(class="text-lg text-white-900 font-medium mb-2") {{ proposal.title }}
  p(class="text-sm text-gray-400 mb-4") {{ proposal.description }}
  div(class="text-xs text-gray-300")
    span Creator: {{ proposal.creator.id }}
    span(class="ml-4") Created At: {{ proposal.createdTime }}
  // Additional details or action buttons can be added here
</template>

<script lang="ts" setup>
defineProps<{
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
</script>

<style scoped>
/* Add your UnoCSS styles here if needed */
</style>
