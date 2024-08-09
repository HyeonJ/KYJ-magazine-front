import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewsDetailTitleSection from "../components/NewsDetailTitleSection";
import NewsDetailMainSection from "../components/NewsDetailMainSection";
import NewsDetailLeftSection from "../components/NewsDetailLeftSection";
import NewsDetailRightSection from "../components/NewsDetailRightSection";
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
        const response = await fetch(
          `http://localhost:8080/api/createNews/detail/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          // 날짜 형식 변환
          const formattedData = {
            ...data,
            date: formatDate(data.createNewsDate),
          };
          setNewsData(formattedData);
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
            <NewsDetailLeftSection />
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
