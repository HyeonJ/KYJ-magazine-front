import React from "react";

const NewsDetailTitleSection = ({ title, author, date, category }) => {
  return (
    <div className="news-detail-title-section">
      <div className="news-detail-title-left-container"></div>
      <div className="news-detail-title-container">
        <h3>{category}</h3>
        <h1>{title}</h1>
        <div className="news-meta">
          <span className="news-author">{author}</span>
          <span className="news-date">{date}</span>
        </div>
      </div>
      <div className="news-detail-title-right-container"></div>
    </div>
  );
};

export default NewsDetailTitleSection;
