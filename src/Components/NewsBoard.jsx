import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem.jsx";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    const url = `http://api.mediastack.com/v1/news?access_key=${import.meta.env.VITE_API_KEY}&countries=ls&categories=${category}`;
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => setArticles(data.data || []))
      .catch((error) => console.error("Error fetching news:", error));
  }, [category]);

  return (
    <div>
      <h2 className="text-center">Latest News from Lesotho</h2>
      {articles.length === 0 ? (
        <p>No news available at the moment.</p>
      ) : (
        articles.map((news, index) => (
          <NewsItem key={index} title={news.title} description={news.description} src={news.image} url={news.url} />
        ))
      )}
    </div>
  );
};

export default NewsBoard;
