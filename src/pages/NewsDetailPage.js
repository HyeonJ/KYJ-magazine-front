import React from "react";
import { useParams } from "react-router-dom";
import NewsDetailTitleSection from "../components/NewsDetailTitleSection";
import NewsDetailMainSection from "../components/NewsDetailMainSection";
import NewsDetailLeftSection from "../components/NewsDetailLeftSection";
import NewsDetailRightSection from "../components/NewsDetailRightSection";
import "../styles/NewsDetail.css";

const NewsDetailPage = () => {
  let { id } = useParams();

  // 여기서 실제로는 id를 사용해 API에서 뉴스 데이터를 가져와야 합니다.
  // 지금은 예시 데이터를 사용합니다.
  const newsData = {
    title: "최후의 한발 4.9㎜차 승리… 김우진, 한국 첫 金 5개 ‘신화’",
    author: "동아일보",
    date: "2024년 8월 1일",
    category: "스포츠",
  };

  return (
    <div className="news-detail-page">
      <NewsDetailTitleSection
        title={newsData.title}
        author={newsData.author}
        date={newsData.date}
        category={newsData.category}
      />
      <div className="news-detail-container">
        <NewsDetailLeftSection />
        <NewsDetailMainSection newsId={id} />
        <NewsDetailRightSection />
      </div>
    </div>
  );
};

export default NewsDetailPage;
