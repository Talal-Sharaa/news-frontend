import React, { useState, useEffect } from "react";
import {
  getContract,
  grantAdminRole,
  grantPublisherRole,
} from "../utils/Web3Utils.js";
import ContractABI from "../utils/NewsPlatform.json"; // Import your contract's ABI

const AdminDashboard = () => {
  const [contract, setContract] = useState(null);
  const [newAdminAddress, setNewAdminAddress] = useState("");
  const [newPublisherAddress, setNewPublisherAddress] = useState("");

  useEffect(() => {
    const init = async () => {
      const provider = await getProvider();
      const signer = await connectWallet();
      const newsContract = getContract(
        ContractABI.abi,
        "0x0Fb5185DCEE394B6dF6247520523783F46804Fd5",
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
      await contract.grantPublisherRole(newPublisherAddress);
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
