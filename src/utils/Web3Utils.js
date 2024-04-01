import { ethers } from "ethers";

const getProvider = async () => {
  // Check if MetaMask is available, otherwise, fallback to a default provider (like Infura)
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
  } else {
    // Replace with your Infura or other provider endpoint
    const infuraProvider = new ethers.providers.InfuraProvider(
      "sepolia",
      "<Your Infura Project ID>"
    );
    return infuraProvider;
  }
};
export const connectWallet = async () => {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return { provider, signer };
  }
};
const getContract = (abi, address, signer) => {
  return new ethers.Contract(address, abi, signer);
};
const submitArticle = async (contract, title, content) => {
  const signer = contract.signer; // Get the signer from the contract instance
  const tx = await signer.submitArticle(title, content);
  await tx.wait(); // Wait for transaction confirmation
};

// ... existing code ...

const grantAdminRole = async (contract, address) => {
  const signer = contract.signer;
  const tx = await signer.grantAdminRole(address);
  await tx.wait();
};

const grantPublisherRole = async (contract, address) => {
  const signer = contract.signer;
  const tx = await signer.grantPublisherRole(address);
  await tx.wait();
};

// ... existing code ...

const getArticlesByPublisher = async (contract, publisherAddress) => {
  const articles = await contract.getArticlesByPublisher(publisherAddress);
  return articles; // Assuming your contract returns an array of ArticlewithOutVersion objects directly
};

export {
  getProvider,
  connectWallet,
  getContract,
  submitArticle,
  grantAdminRole,
  grantPublisherRole,
  getArticlesByPublisher,
};
