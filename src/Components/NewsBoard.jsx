import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem.jsx";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const url = `https://api.currentsapi.services/v1/search?keywords=Lesotho&language=en&apiKey=${import.meta.env.VITE_API_KEY}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("API response:", data); // 👈 Log the full API response
      setArticles(data.articles || []);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}, [category]);


  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      {articles.length === 0 ? (
        <p className="text-center">No news available.</p>
      ) : (
        articles.map((news, index) => {
          // Check if important fields exist before rendering
          if (!news.title || !news.description || !news.url) return null;

          return (
            <NewsItem
              key={index}
              title={news.title}
              description={news.description}
              src={news.urlToImage}
              url={news.url}
            />
          );
        })
      )}
    </div>
  );
};

export default NewsBoard;
