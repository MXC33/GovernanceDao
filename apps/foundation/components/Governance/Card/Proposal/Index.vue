<template lang="pug">
Card
  HList(space-x="6")
    PageSection(section="proposal")
  HList(justify="between")
    div Total Proposals: {{ proposals.length }}
    div Voting Power: {{ userVotingPower }}

  // Search and Filters
  HList(justify="between" class="mb-4")
    Input(type="text" placeholder="Search proposals..." v-model="searchQuery")
    Select(v-model="currentFilter")
      option(value="all") All
      option(value="active") Active
      option(value="pending") Pending
      option(value="completed") Completed

  // Proposal List
  div(v-for="proposal in filteredProposals" :key="proposal.id")
    ProposalCard(:proposal="proposal")
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import ProposalCard from "./ProposalCard.vue"; // Import the ProposalCard component

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

// Inside your <script lang="ts" setup> tag in Index.vue
const proposals = ref<Proposal[]>([
  {
    id: 1,
    title: "Improve In-Game Chat System",
    description:
      "This proposal aims to revamp the current in-game chat system to provide a better user experience.",
    status: "active",
    result: "pending",
    replies: 12,
    power2: 150,
    power1: 120,
    isVoted: false,
    isModerator: false,
    createdTime: "2023-01-01T12:00:00Z",
    votes: [
      {
        status: "yes",
        id: 201,
        amount: 50,
        account: { id: "0xABC" },
      },
      // ... other votes
    ],
    creator: { id: "0x123" },
  },
  {
    id: 2,
    title: "Update Quest Mechanics",
    description:
      "Proposal to introduce new mechanics to the quest system that will enhance player engagement.",
    status: "pending",
    result: "pending",
    replies: 5,
    power2: 80,
    power1: 75,
    isVoted: true,
    isModerator: true,
    createdTime: "2023-01-02T15:30:00Z",
    votes: [
      {
        status: "no",
        id: 202,
        amount: 30,
        account: { id: "0xDEF" },
      },
      // ... other votes
    ],
    creator: { id: "0x456" },
  },
  {
    id: 3,
    title: "New Character Skins",
    description:
      "Introducing a range of new skins for characters to increase customization options for players.",
    status: "completed",
    result: "success",
    replies: 22,
    power2: 200,
    power1: 180,
    isVoted: true,
    isModerator: false,
    createdTime: "2023-01-03T09:00:00Z",
    votes: [
      {
        status: "yes",
        id: 203,
        amount: 100,
        account: { id: "0xGHI" },
      },
      // ... other votes
    ],
    creator: { id: "0x789" },
  },
  {
    id: 4,
    title: "Enhance Security Protocols",
    description:
      "This proposal suggests enhancements to the current security protocols to safeguard user data.",
    status: "active",
    result: "pending",
    replies: 8,
    power2: 60,
    power1: 58,
    isVoted: false,
    isModerator: true,
    createdTime: "2023-01-04T17:45:00Z",
    votes: [
      {
        status: "yes",
        id: 204,
        amount: 75,
        account: { id: "0xJKL" },
      },
      // ... other votes
    ],
    creator: { id: "0x012" },
  },
  {
    id: 5,
    title: "Gameplay Balance Changes",
    description:
      "Proposal for a series of balance changes to the gameplay to ensure a fair competitive environment.",
    status: "pending",
    result: "pending",
    replies: 18,
    power2: 140,
    power1: 130,
    isVoted: true,
    isModerator: false,
    createdTime: "2023-01-05T11:20:00Z",
    votes: [
      {
        status: "no",
        id: 205,
        amount: 45,
        account: { id: "0xMNO" },
      },
      // ... other votes
    ],
    creator: { id: "0x345" },
  },
]);

const userVotingPower = ref<number>(100); // Set some dummy voting power

const searchQuery = ref("");
const currentFilter = ref("all");

const filteredProposals = computed(() => {
  let result = proposals.value;
  if (currentFilter.value !== "all") {
    result = result.filter((p) => p.status === currentFilter.value);
  }
  if (searchQuery.value) {
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  }
  return result;
});

// ...rest of your script
</script>

<style scoped>
/* Add your UnoCSS styles here if needed */
</style>
