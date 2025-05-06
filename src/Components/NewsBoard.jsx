import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem.jsx";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `https://newsdata.io/api/1/news?country=ls&category=${category}&apikey=${import.meta.env.VITE_API_KEY}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setArticles(data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch news", err);
        setLoading(false);
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
          if (!news.title || !news.description || !news.link) return null;
          return (
            <NewsItem
              key={index}
              title={news.title}
              description={news.description}
              src={news.image_url} // Newsdata uses image_url
              url={news.link}      // Newsdata uses link, not url
            />
          );
        })
      )}
    </div>
  );
};

export default NewsBoard;
