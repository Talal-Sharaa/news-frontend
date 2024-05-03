import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getContract, getProvider } from "../utils/Web3Utils";
import ContractABI from "../utils/NewsPlatform.json";

const ProtectedRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const provider = await getProvider();
        const signer = await provider.getSigner();
        const newsContract = getContract(
          ContractABI.abi,
          "0xF3D22D4B0c471800EC1BEA0D1d51d081250c6efa", // Replace with your contract address
          signer
        );
        const userAddress = await signer.getAddress();
        const isAdmin = await newsContract.isAdmin(userAddress);
        setIsAdmin(isAdmin);
      } catch (error) {
        console.error("Error checking admin role:", error);
      } finally {
      }
    };
    checkAdminRole();
  }, []);

  return isAdmin ? children : <Navigate to="/" />; // Render children if admin, otherwise redirect
};

export default ProtectedRoute;
