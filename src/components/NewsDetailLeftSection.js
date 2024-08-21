import React, { useState, useEffect } from "react";
import API_ENDPOINTS from "../config/api";

const NewsDetailLeftSection = ({ newsData }) => {
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedNews = async () => {
      try {
        const url = `${API_ENDPOINTS.RELATED_NEWS_LIST}/${newsData.createNewsNum}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRelatedNews(data.relatedNews || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch related news:", error);
        setError("관련 기사를 불러오는데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchRelatedNews();
  }, [newsData.createNewsNum]);

  const renderContent = () => {
    if (loading) {
      return <div></div>;
    }
    if (error) {
      return <div>{error}</div>;
    }
    if (relatedNews.length === 0) {
      return <p>관련 기사가 없습니다.</p>;
    }
    return (
      <ul>
        {relatedNews.map((news) => (
          <li key={news.createNewsNum}>
            <a href={`/news/${news.createNewsNum}`}>{news.title}</a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="news-detail-left-section">
      <h3>관련 기사</h3>
      {renderContent()}
    </div>
  );
};

export default NewsDetailLeftSection;
