const ethers = require("ethers");
console.log(ethers);

const getProvider = async () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum);
    return provider;
  } else {
    throw new Error("Please install MetaMask or another Ethereum provider.");
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

const registerPublisher = async (contract, address) => {
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
  // connectWallet,
  getContract,
  submitArticle,
  grantAdminRole,
  registerPublisher,
  getArticlesByPublisher,
};
