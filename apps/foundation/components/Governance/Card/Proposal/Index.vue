<template lang="pug">
Card
  HList(space-x="6")
    PageSection(section="proposal")
  HList(justify="between")
    div Total Proposals: {{ proposals.length }}
    div Voting Power: {{ userVotingPower }}

  // Search and Filters
  HList(justify="between" class="mb-4" )
    input(type="text" placeholder="Search proposals..." v-model="searchQuery" bg="gray-900 md:ix-black")
    select(v-model="currentFilter" bg="gray-900 md:ix-black")
      option(value="all") All
      option(value="active") Active
      option(value="completed") Completed

  // Proposal List
  div(v-for="proposal in filteredProposals" :key="proposal.id")
    ProposalCard(:proposal="proposal")
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import ProposalCard from "./ProposalCard.vue";

interface Proposal {
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
}

const proposals = ref<Proposal[]>([]);
const userVotingPower = ref<number>(100); // Replace with actual logic to fetch user's voting power

const searchQuery = ref("");
const currentFilter = ref("all");

onMounted(async () => {
  await fetchProposals();
});

const fetchProposals = async () => {
  const query = `
    {
      proposals(first: 5) {
        id
        title
        description
        status
        result
        replies
        power2
        power1
        isVoted
        isModerator
        createdTime
        votes(first: 1000) {
          id
          amount
          status
          account {
            id
          }
        }
        creator {
          id
        }
      }
    }
  `;
  try {
    const response = await fetch(
      "https://api.thegraph.com/subgraphs/name/albanny/governance",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      },
    );
    const { data } = await response.json();
    proposals.value = data.proposals;
    console.log(proposals.value); // Console log to see fetched proposals
  } catch (error) {
    console.error("Error fetching proposals:", error);
  }
};

const filteredProposals = computed(() => {
  let result = proposals.value.slice(); // Create a copy of the proposals array
  if (currentFilter.value !== "all") {
    result = result.filter((proposal) => {
      const statusCategory = proposal.status === "1" ? "active" : "completed";
      return currentFilter.value === statusCategory;
    });
  }
  if (searchQuery.value) {
    result = result.filter(
      (proposal) =>
        proposal.title
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        proposal.description
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()),
    );
  }
  // Sort the proposals by createdTime in descending order
  result.sort((a, b) => parseInt(b.createdTime) - parseInt(a.createdTime));
  return result;
});
</script>
