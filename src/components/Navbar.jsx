import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getContract, getProvider } from "../utils/Web3Utils";
import ContractABI from "../utils/NewsPlatform.json";

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);
  const [isAdmin, setIsAdmin] = useState(false); // State for admin role
  const [isPublisher, setIsPublisher] = useState(false); // State for publisher role
  const [loading, setLoading] = useState(true); // State for loading
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        const isPublisher = await newsContract.isPublisher(userAddress);
        setIsAdmin(isAdmin);
        setIsPublisher(isPublisher);
        setLoading(false); // Set loading to false after checking the admin role
      } catch (error) {
        console.error("Error checking admin role:", error);
      }
    };
    checkAdminRole();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while the admin role is being checked
  }

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        {isAdmin && <Tab label="Admin Dashboard" component={Link} to="/" />}
        <Tab label="Article List" component={Link} to="/articles" />
        {isPublisher && (
          <Tab label="Submit Article" component={Link} to="/submit" />
        )}
      </Tabs>
    </Box>
  );
}