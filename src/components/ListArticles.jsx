import React, { useState, useEffect } from 'react';
import { getContract, getArticlesByPublisher } from '../utils/Web3Utils'; 
import ContractABI from '../utils/NewsPlatform.json'; // Import your contract's ABI

const ArticleList = () => {
    const [contract, setContract] = useState(null);
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            try {
                const provider = await getProvider();
                const newsContract = getContract(ContractABI.abi, '0x0Fb5185DCEE394B6dF6247520523783F46804Fd5', provider); // Read-only, so no signer needed
                setContract(newsContract);

                const fetchedArticles = await newsContract.getArticlesByPublisher(await provider.getSigner().getAddress()); 
                setArticles(fetchedArticles);
            } catch (error) {
                console.error("Error fetching articles:", error); 
            } finally {
                 setIsLoading(false);
            }
        }
        init();
    }, []);

    return (
        <div>
            <h1>News Articles</h1>
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
}

export default ArticleList;
