import React from "react";

const MainRightSection = () => {
  const categories = [
    {
      name: "문화",
      articles: ["소기사1", "소기사2"],
    },
    {
      name: "사회",
      articles: ["소기사1", "소기사2"],
    },
    {
      name: "IT 과학",
      articles: ["소기사1", "소기사2"],
    },
    // 추가 카테고리를 여기에 넣을 수 있습니다
  ];

  const trends = ["트렌드 기사1", "트렌드 기사2", "트렌드 기사3"];

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
          {trends.map((trend, index) => (
            <li key={index}>{trend}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainRightSection;
