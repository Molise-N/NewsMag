import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem.jsx";

const NewsBoard = ({ query = "Lesotho" }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&token=${import.meta.env.VITE_API_KEY}`;
    fetch(url)
      .then(res => res.json())
      .then(data => setArticles(data.articles))
      .catch(err => console.error("Error fetching news:", err));
  }, [query]);

  return (
    <div>
      <h2 className="text-center">Latest News on <span className="badge bg-danger">{query}</span></h2>
      {articles.length === 0 ? (
        <p>No news found.</p>
      ) : (
        articles.map((news, index) => (
          <NewsItem key={index} title={news.title} description={news.description} src={news.image} url={news.url} />
        ))
      )}
    </div>
  );
};

export default NewsBoard;
