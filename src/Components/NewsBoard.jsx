import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem.jsx";
import placeholderImage from "../assets/news.jpg"; // fallback image

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const url = `https://newsdata.io/api/1/news?country=ls&category=${category}&apikey=${import.meta.env.VITE_API_KEY}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log('API Response:', data); // Log the full API response
      if (data.status === "error") {
        console.error('Error fetching data:', data.results); // Log the error message in the results field
        setArticles([]);
      } else if (Array.isArray(data.results)) {
        setArticles(data.results);
      } else {
        console.warn("No valid articles found in API response");
        setArticles([]);
      }
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
          return (
            <NewsItem
              key={index}
              title={news.title}
              description={news.description}
              src={news.image_url || placeholderImage}
              url={news.link}
            />
          );
        })
      )}
    </div>
  );
};

export default NewsBoard;
