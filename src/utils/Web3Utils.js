import { ethers } from "ethers";

const getProvider = async () => {
    // Check if MetaMask is available, otherwise, fallback to a default provider (like Infura)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        return provider;
    } else {
        // Replace with your Infura or other provider endpoint
        const infuraProvider = new ethers.providers.InfuraProvider("sepolia", "<Your Infura Project ID>");
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
