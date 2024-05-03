import React, { useState, useEffect } from "react";
import { getContract, getProvider } from "../utils/Web3Utils";
import ContractABI from "../utils/NewsPlatform.json";
import { Form, Button } from "react-bootstrap";

const EditArticle = ({ articleId }) => {
  const [contract, setContract] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        console.log("Article ID:", articleId); // Check if articleId is correct

        const provider = await getProvider();
        const signer = provider.getSigner();
        const newsContract = getContract(
          ContractABI.abi,
          "0xF3D22D4B0c471800EC1BEA0D1d51d081250c6efa", // Replace with your contract address
          signer
        );
        setContract(newsContract);
        console.log("Contract instance:", newsContract); // Check if contract is created

        const fetchedVersions = await newsContract.getArticleVersions(
          articleId
        );
        setVersions(fetchedVersions);
        console.log("Fetched versions:", fetchedVersions);

        const article = await newsContract.getArticle(articleId);
        setTitle(article.title);
        setContent(article.content);
        console.log(
          "Article title and content:",
          article.title,
          article.content
        );
      } catch (error) {
        console.error("Error in EditArticle useEffect:", error);
      }
    };
    init();
  }, [articleId]);

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      await contract.updateArticle(articleId, title, content);
      alert("Article updated successfully!");

      // Refetch article versions
      const fetchedVersions = await contract.getArticleVersions(articleId);
      setVersions(fetchedVersions);
    } catch (error) {
      console.error("Error updating article:", error);
      alert("Failed to update article.");
    }
  };
  return (
    <div>
      <h2>Edit Article</h2>

      <Form onSubmit={handleEditSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Article
        </Button>
      </Form>
    </div>
  );
};

export default EditArticle;
