<template lang="pug">
Card
  HList(space-x="6")
    PageSection(section="newProposal")
  HList(justify="between")
    div Total Proposals: {{ totalProposals }} 
    div Voting Power: {{ votingPower }}

  // New Proposal Form
  form(@submit.prevent="addNewProposal" class="mt-6")
    h2(class="text-xl font-bold mb-3") Create New Proposal
    div(class="mb-4")
      label(for="proposal-title" class="block mb-2 text-sm font-medium text-black-700") Proposal Title
      input#proposal-title(type="text" v-model="newProposal.title" required placeholder="Enter the proposal title" class="input input-bordered w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none text-black")

    div(class="mb-4")
      label(for="proposal-description" class="block mb-2 text-sm font-medium text-black-700") Proposal Description
      textarea#proposal-description(v-model="newProposal.description" required placeholder="Describe your proposal" class="textarea textarea-bordered w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none h-24 text-black")

    ButtonGlitch(type="submit" btn="~ primary-outline-cut" text="Submit Proposal" class=" mt-4")
</template>

<script lang="ts" setup>
import { ref } from "vue";

const totalProposals = ref(0); // Replace with actual total proposals count
const votingPower = ref(0); // Replace with actual voting power

// Simulated list of proposals
const proposals = ref([
  // Existing proposals here
]);

const newProposal = ref({
  title: "",
  description: "",
});

const addNewProposal = () => {
  // Adding a new proposal to the proposals array
  const newId = proposals.value.length + 1;
  const newProposalToAdd = {
    id: newId,
    title: newProposal.value.title,
    description: newProposal.value.description,
    status: "pending", // Default status for new proposals
    createdAt: new Date().toISOString(),
    // Additional fields as required
  };
  // proposals.value.push(newProposalToAdd);

  // Resetting the form fields
  newProposal.value.title = "";
  newProposal.value.description = "";

  // Update totalProposals count
  totalProposals.value = proposals.value.length;
};
</script>
