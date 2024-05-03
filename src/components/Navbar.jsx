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
      } catch (error) {
        console.error("Error checking admin role:", error);
      }
    };
    checkAdminRole();
  }, []);

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        {isAdmin && <Tab label={<Link to="/">Admin Dashboard</Link>} />}
        <Tab label={<Link to="/articles">Article List</Link>} />
        {isPublisher && (
          <Tab label={<Link to="/submit">Submit Article</Link>} />
        )}
        {isAdmin && <Tab label={<Link to="/editArticle">Edit Article</Link>} />}
      </Tabs>
    </Box>
  );
}
