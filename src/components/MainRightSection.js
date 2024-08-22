import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API_ENDPOINTS from "../config/api";

const MainRightSection = () => {
  const [trends, setTrends] = useState([]);
  const [categoryNews, setCategoryNews] = useState({});

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.TREND_NEWS_LIST}`);
        const data = await response.json();
        setTrends(data);
      } catch (error) {
        console.error("Error fetching trend data:", error);
      }
    };

    const fetchCategoryNews = async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.CATEGORY_RANKING_NEWS_LIST}`
        );
        const data = await response.json();
        setCategoryNews(data);
      } catch (error) {
        console.error("Error fetching category news data:", error);
      }
    };

    fetchTrends();
    fetchCategoryNews();
  }, []);

  const categories = ["생활/문화", "정치/사회", "IT과학"];

  return (
    <div className="category-view">
      <div className="section">
        <h2>카테고리별 랭킹</h2>
        {categories.map((category, index) => (
          <div key={index} className="category">
            <h3>{category}</h3>
            <ul>
              {categoryNews[category]?.map((item) => (
                <li key={item.createNewsNum}>
                  <Link to={`/news/${item.createNewsNum}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="section">
        <h2>실시간 트렌드</h2>
        <ul>
          {trends.map((item) => (
            <li key={item.id}>
              <Link to={`/news/${item.createNewsNum}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainRightSection;
