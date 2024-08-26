import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import API_ENDPOINTS from "../config/api";

const MainLeftSection = () => {
  const location = useLocation();
  const recommendedArticles = localStorage.getItem("recommendedArticles");
  const [personalizedArticles, setPersonalizedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log(recommendedArticles);
    // 컴포넌트 마운트 시 로그인 상태 확인
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const fetchPersonalizedArticles = async () => {
      if (isLoggedIn && recommendedArticles) {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${API_ENDPOINTS.RECOMMEND_NEWS_LIST}?recommend=${recommendedArticles}`
          );
          if (response.status === 200) {
            setPersonalizedArticles(response.data);
          }
        } catch (error) {
          console.error("맞춤 기사를 불러오는 데 실패했습니다:", error);
          // 에러 처리 (예: 사용자에게 알림)
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPersonalizedArticles();
  }, [isLoggedIn, recommendedArticles]);

  const renderContent = () => {
    if (!isLoggedIn) {
      return <p>로그인을 하시면 맞춤 기사를 추천해드립니다</p>;
    }

    if (isLoading) {
      return <p>기사를 불러오는 중입니다...</p>;
    }

    if (personalizedArticles.length === 0) {
      return <p>추천 기사가 없습니다</p>;
    }

    return (
      <ul>
        {personalizedArticles.map((news, index) => (
          <li key={news.createNewsNum} className="related-news-item">
            <a
              href={`/news/${news.createNewsNum}`}
              className="related-news-link"
            >
              <img
                src={`${API_ENDPOINTS.BASE_URL}${news.thumbnailURL}`}
                alt={news.title}
                className="related-news-thumbnail"
              />
              <span className="related-news-title">{news.title}</span>
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="personal-view">
      <div className="section">
        <h2>나만의 맞춤 기사</h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default MainLeftSection;
