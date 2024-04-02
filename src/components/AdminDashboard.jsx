import React, { useState, useEffect } from "react";
import {
  getContract,
  grantAdminRole,
  registerPublisher,
  getProvider,
} from "../utils/Web3Utils.js";
import ContractABI from "../utils/NewsPlatform.json"; // Import your contract's ABI
import 'water.css/out/water.css';

const AdminDashboard = () => {
  const [contract, setContract] = useState(null);
  const [newAdminAddress, setNewAdminAddress] = useState("");
  const [newPublisherAddress, setNewPublisherAddress] = useState("");
  const [provider, setProvider] = useState(null); // Add this line

  useEffect(() => {
    const init = async () => {
      const provider = await getProvider();
      setProvider(provider); // And this line

      // Get the signer
      const signer = await provider.getSigner();

      const newsContract = getContract(
        ContractABI.abi,
        "0xFaA5951CA9E6B66Cad222a6aE339Ad881Fd48470",
        signer
      );
      setContract(newsContract);
    };
    init();
  }, []);

  const handleAdminSubmit = async (event) => {
    event.preventDefault();
    try {
      await contract.grantAdminRole(newAdminAddress);
      alert("Admin role granted successfully!");
      setNewAdminAddress(""); // Clear input
    } catch (error) {
      console.error("Error granting admin role:", error);
      alert("Failed to grant admin role.");
    }
  };

  const handlePublisherSubmit = async (event) => {
    event.preventDefault();
    try {
      await contract.registerPublisher(newPublisherAddress);
      alert("Publisher role granted successfully!");
      setNewPublisherAddress(""); // Clear input
    } catch (error) {
      console.error("Error granting publisher role:", error);
      alert("Failed to grant publisher role.");
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* ... Form for granting admin role ... */}
      <form onSubmit={handleAdminSubmit}>
        <input
          value={newAdminAddress}
          onChange={(e) => setNewAdminAddress(e.target.value)}
          placeholder="Enter User's Address"
        />
        <button type="submit">Grant Admin Role</button>
      </form>

      {/* Form for granting publisher role */}
      <form onSubmit={handlePublisherSubmit}>
        <input
          value={newPublisherAddress}
          onChange={(e) => setNewPublisherAddress(e.target.value)}
          placeholder="Enter User's Address"
        />
        <button type="submit">Grant Publisher Role</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
