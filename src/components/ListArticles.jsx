import React, { useState } from "react";
import { getContract, getProvider } from "../utils/Web3Utils.js";
import ContractABI from "../utils/NewsPlatform.json"; // Import your contract's ABI

const ArticleList = () => {
  const [contract, setContract] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [publisher, setPublisher] = useState("");

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const provider = await getProvider();
      const newsContract = getContract(
        ContractABI.abi,
        "0x0Fb5185DCEE394B6dF6247520523783F46804Fd5",
        provider
      ); // Read-only, so no signer needed
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
      {isLoading && <div>Loading articles...</div>}
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
    </div>
  );
};

export default ArticleList;
