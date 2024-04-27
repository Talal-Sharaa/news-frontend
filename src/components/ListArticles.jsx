import React, { useState, useEffect } from "react";
import { getContract, getProvider } from "../utils/Web3Utils.js";
import ContractABI from "../utils/NewsPlatform.json"; // Import your contract's ABI
import "water.css/out/water.css";

const ArticleList = () => {
  const [contract, setContract] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [publisher, setPublisher] = useState("");
  const [provider, setProvider] = useState(null);
  const [publishers, setPublishers] = useState([]);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const provider = await getProvider();
      setProvider(provider);

      // Get the signer
      const signer = await provider.getSigner();

      const newsContract = getContract(
        ContractABI.abi,
        "0x738e41AB331709bc2C41EC75F2a91cFf53762433",
        signer
      );
      setContract(newsContract);

      const fetchedArticles = await newsContract.getArticlesByPublisher(
        publisher
      );
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPublishers = async () => { // Separate function to fetch publishers
    setIsLoading(true);
    try {
      const provider = await getProvider();
      setProvider(provider);

      // Get the signer
      const signer = await provider.getSigner();

      const newsContract = getContract(
        ContractABI.abi,
        "0x738e41AB331709bc2C41EC75F2a91cFf53762433",
        signer
      );
      setContract(newsContract);

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
  }, []);

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
      <button onClick={fetchPublishers}>Show Publishers</button> {/* Button to fetch publishers */}
      {isLoading && <div>Loading...</div>}
      {!isLoading && articles.length === 0 && <div>No articles found.</div>}
      {!isLoading && (
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <h3>{article.title}</h3>
              <p>{article.content}</p>
            </li>
          ))}
        </ul>
      )}
      <h2>Publishers</h2>
      {!isLoading && (
        <ul>
          {publishers.map((publisher, index) => (
            <li key={index}>
              <h3>{publisher.publisherID}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArticleList;