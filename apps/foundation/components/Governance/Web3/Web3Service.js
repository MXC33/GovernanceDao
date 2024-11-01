// web3service.js
import { ethers } from "ethers";
import DaoContractABI from "./MyContractAbi.json"; // Adjust the path as needed

export function useWeb3Service() {
  const polygonMumbai = {
    chainId: ethers.utils.hexValue(80001),
    rpcUrl: "https://rpc-mumbai.maticvigil.com",
  };

  const provider = new ethers.providers.JsonRpcProvider(
    polygonMumbai.rpcUrl,
    polygonMumbai.chainId,
  );
  const signer = provider.getSigner();

  const contractAddress = "0x6505dA8d29A3C3B4E2d8Ce581FD50b0D0d29B652";
  const contract = new ethers.Contract(contractAddress, DaoContractABI, signer);

  // Example utility function
  async function getCurrentUserAddress() {
    try {
      const accounts = await provider.listAccounts();
      return accounts[0] || null;
    } catch (error) {
      console.error("Error getting user address:", error);
      return null;
    }
  }

  return {
    provider,
    signer,
    contract,
    getCurrentUserAddress,
  };
}
