import { ref, onMounted } from "vue";
import { useWeb3Service } from "./Web3Service"; // Ensure the correct path is used

export function useDaoFunctions() {
  const { contract, signer } = useWeb3Service();
  const proposals = ref([]);

  async function registerMember() {
    try {
      const transaction = await contract.registerMember();
      await transaction.wait();
      console.log("Member registered successfully");
    } catch (error) {
      console.error("Error registering member:", error);
    }
  }

  async function createProposal(description, duration) {
    try {
      const transaction = await contract.createProposal(description, duration);
      await transaction.wait();
      console.log("Proposal created successfully");
    } catch (error) {
      console.error("Error creating proposal:", error);
    }
  }

  async function voteOnProposal(proposalId, vote) {
    try {
      const transaction = await contract.voteOnProposal(proposalId, vote);
      await transaction.wait();
      console.log("Voted on proposal successfully");
    } catch (error) {
      console.error("Error voting on proposal:", error);
    }
  }

  async function approveProposal(proposalId) {
    try {
      const transaction = await contract.approveProposal(proposalId);
      await transaction.wait();
      console.log("Proposal approved successfully");
    } catch (error) {
      console.error("Error approving proposal:", error);
    }
  }

  async function countVotes(proposalId) {
    try {
      const transaction = await contract.countVotes(proposalId);
      await transaction.wait();
      console.log("Votes counted successfully");
    } catch (error) {
      console.error("Error counting votes:", error);
    }
  }

  async function fetchProposals() {
    try {
      const proposalsCount = await contract.nextProposal();
      for (let i = 1; i < proposalsCount; i++) {
        const proposal = await contract.Proposals(i);
        proposals.value.push({
          id: proposal.id,
          description: proposal.description,
          deadline: new Date(proposal.deadline * 1000).toLocaleString(),
          votesUp: proposal.votesUp,
          votesDown: proposal.votesDown,
          isApproved: proposal.isApproved,
        });
      }
    } catch (error) {
      console.error("Error fetching proposals:", error);
    }
  }

  // Optionally, add other smart contract functions here

  // Use the onMounted lifecycle hook to ensure the fetchProposals function runs when the component mounts
  onMounted(async () => {
    await fetchProposals();
  });

  return {
    registerMember,
    createProposal,
    voteOnProposal,
    approveProposal,
    countVotes,
    fetchProposals,
    proposals,
  };
}
