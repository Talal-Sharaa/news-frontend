import React, { useState, useEffect, useCallback } from "react";
import { getContract, getProvider } from "../utils/Web3Utils.js";
import ContractABI from "../utils/NewsPlatform.json"; // Import your contract's ABI
import "water.css/out/water.css";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [publisher, setPublisher] = useState("");
  const [publishers, setPublishers] = useState([]);

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    try {
      const provider = await getProvider();

      // Get the signer
      const signer = await provider.getSigner();

      const newsContract = getContract(
        ContractABI.abi,
        "0xBFDb9909930b72356Bf8245B6e3270A1251f53cA",
        signer
      );
      const fetchedArticles = await newsContract.getArticlesByPublisher(
        publisher
      );
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  }, [publisher]);

  const fetchPublishers = async () => {
    // Separate function to fetch publishers
    setIsLoading(true);
    try {
      const provider = await getProvider();

      // Get the signer
      const signer = await provider.getSigner();

      const newsContract = getContract(
        ContractABI.abi,
        "0xBFDb9909930b72356Bf8245B6e3270A1251f53cA",
        signer
      );

      const fetchedPublishers = await newsContract.getAllPublishers();
      setPublishers(fetchedPublishers);
    } catch (error) {
      console.error("Error fetching publishers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchArticles();
  };

  return (
    <div>
      <h1>News Articles</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          placeholder="Enter Publisher Address"
          required
        />
        <button type="submit">Fetch Articles</button>
      </form>
      <button onClick={fetchPublishers}>Show Publishers</button>{" "}
      {/* Button to fetch publishers */}
      {isLoading && <div>Loading...</div>}
      {!isLoading && articles.length === 0 && <div>No articles found.</div>}
      {!isLoading && (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <h3>{article.title}</h3>
              <p>{article.content}</p>
            </li>
          ))}
        </ul>
      )}
      <h2>Publishers</h2>
      {!isLoading && (
        <ul>
          {publishers.map((publisher) => (
            <li key={publisher.id}>
              <h3>{publisher.publisherID}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArticleList;
