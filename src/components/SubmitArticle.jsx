import React, { useState } from "react";
import { getContract, submitArticle } from "../utils/Web3Utils";
import ContractABI from "../utils/NewsPlatform.json"; // Import your contract's ABI
import CircularProgress from "@material-ui/core/CircularProgress"; // Import CircularProgress from Material-UI

const SubmitArticle = () => {
  const [contract, setContract] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await contract.submitArticle(title, content);
      alert("Article submitted successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error submitting article:", error);
      alert("Failed to submit article.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Submit New Article</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Article Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter Article Content"
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={24} /> : "Submit Article"}
        </button>
      </form>
    </div>
  );
};
