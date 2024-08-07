import React from "react";

const MainLeftSection = () => {
  const personalizedArticles = ["기사1", "기사2", "기사3"];

  return (
    <div className="personal-view">
      <div className="section">
        <h2>나만의 맞춤 기사</h2>
        <ul>
          {personalizedArticles.map((article, index) => (
            <li key={index}>{article}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainLeftSection;
