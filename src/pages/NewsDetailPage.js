import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewsDetailTitleSection from "../components/NewsDetailTitleSection";
import NewsDetailMainSection from "../components/NewsDetailMainSection";
import NewsDetailLeftSection from "../components/NewsDetailLeftSection";
import NewsDetailRightSection from "../components/NewsDetailRightSection";
import API_ENDPOINTS from "../config/api";
import "../styles/NewsDetail.css";

const NewsDetailPage = () => {
  let { id } = useParams();
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formatter.format(date);
  };

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.NEWS_DETAIL}/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          // 날짜 형식 변환
          const formattedData = {
            ...data,
            date: formatDate(data.createNewsDate),
          };
          setNewsData(formattedData);

          // localStorage에 token이 있을 경우에만 updateNewsLog 실행
          const token = localStorage.getItem("token");
          if (token) {
            await updateNewsLog(id, token);
          }
        } else if (response.status === 404) {
          setError("뉴스를 찾을 수 없습니다.");
        } else {
          throw new Error("서버 오류가 발생했습니다.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, [id]);

  const updateNewsLog = async (newsId, token) => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.UPDATE_NEWS_LOG}/${newsId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to update news log");
      }
    } catch (err) {
      console.error("Error updating news log:", err);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div className="news-detail-page">
      {newsData ? (
        <>
          <NewsDetailTitleSection
            title={newsData.title}
            author={newsData.author}
            date={newsData.date}
            category={newsData.category}
          />
          <div className="news-detail-container">
            <NewsDetailLeftSection newsData={newsData} />
            <NewsDetailMainSection newsData={newsData} />
            <NewsDetailRightSection />
          </div>
        </>
      ) : (
        <div>뉴스 데이터를 찾을 수 없습니다.</div>
      )}
    </div>
  );
};

export default NewsDetailPage;
