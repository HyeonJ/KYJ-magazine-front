import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API_ENDPOINTS from "../config/api";

const MainRightSection = () => {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.TREND_NEWS_LIST}`);
        const data = await response.json();
        setTrends(data); // 전체 데이터 객체를 저장합니다 (id와 title 포함)
      } catch (error) {
        console.error("Error fetching trend data:", error);
      }
    };

    fetchTrends();
  }, []);

  const categories = [
    {
      name: "생활/문화",
      articles: ["소기사1", "소기사2"],
    },
    {
      name: "정치/사회",
      articles: ["소기사1", "소기사2"],
    },
    {
      name: "IT과학",
      articles: ["소기사1", "소기사2"],
    },
    // 추가 카테고리를 여기에 넣을 수 있습니다
  ];

  return (
    <div className="category-view">
      <div className="section">
        <h2>카테고리별 랭킹</h2>
        {categories.map((category, index) => (
          <div key={index} className="category">
            <h3>{category.name}</h3>
            <ul>
              {category.articles.map((article, articleIndex) => (
                <li key={articleIndex}>{article}</li>
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
