import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getContract, getProvider } from "../utils/Web3Utils";
import ContractABI from "../utils/NewsPlatform.json";

const PublisherProtectedRoute = ({ children }) => {
  const [isPublisher, setIsPublisher] = useState(false);

  useEffect(() => {
    const checkPublisherRole = async () => {
      try {
        const provider = await getProvider();
        const signer = await provider.getSigner();
        const newsContract = getContract(
          ContractABI.abi,
          "0xF3D22D4B0c471800EC1BEA0D1d51d081250c6efa", // Replace with your contract address
          signer
        );
        const userAddress = await signer.getAddress();
        const isPublisher = await newsContract.isPublisher(userAddress);
        setIsPublisher(isPublisher);
      } catch (error) {
        console.error("Error checking publisher role:", error);
      }
    };
    checkPublisherRole();
  }, []);

  return isPublisher ? children : <Navigate to="/submit" />; // Render children if publisher, otherwise redirect
};

export default PublisherProtectedRoute;
