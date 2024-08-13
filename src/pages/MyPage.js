import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./MyPage.css";

const MyPage = () => {
  const { user, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    subInterest: [],
    mainInterest: [],
  });

  const interestCategories = {
    문화: ["영화/드라마", "음악", "미술", "문학", "공연", "전통문화"],
    "사회/정치": ["국내정치", "국제", "경제", "환경", "인권", "교육"],
    "IT/과학": [
      "인공지능/AI",
      "모바일",
      "우주",
      "생명공학",
      "로봇",
      "블록체인",
    ],
  };

  useEffect(() => {
    if (user) {
      setFormData({
        subInterest: user.subInterest ? user.subInterest.split(",") : [],
        mainInterest: user.mainInterest ? user.mainInterest.split(",") : [],
      });
    }
  }, [user]);

  const splitInterests = (interest) => {
    if (interest.includes("/")) {
      return interest.split("/");
    }
    return [interest];
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedSubInterest = checked
      ? [...formData.subInterest, ...splitInterests(value)]
      : formData.subInterest.filter(
          (item) => !splitInterests(value).includes(item)
        );

    let updatedMainInterest = [];
    for (let category in interestCategories) {
      updatedMainInterest = [
        ...updatedMainInterest,
        ...interestCategories[category]
          .flatMap(splitInterests)
          .filter((interest) => updatedSubInterest.includes(interest))
          .map(() => category),
      ];
    }

    setFormData((prevState) => ({
      ...prevState,
      subInterest: updatedSubInterest,
      mainInterest: updatedMainInterest,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({
        ...formData,
        mainInterest: formData.mainInterest.join(","),
        subInterest: formData.subInterest.join(","),
      });
      alert("관심사가 업데이트되었습니다.");
    } catch (error) {
      console.error("프로필 업데이트 오류:", error);
      alert("관심사 업데이트에 실패했습니다.");
    }
  };

  return (
    <div className="my-page">
      <h2>회원정보</h2>
      <div className="user-info">
        <div className="info-group">
          <label>이름</label>
          <input type="text" value={user?.name || ""} readOnly />
        </div>
        <div className="info-group">
          <label>이메일</label>
          <input type="email" value={user?.email || ""} readOnly />
        </div>
        <div className="info-group">
          <label>나이</label>
          <input type="text" value={user?.age || ""} readOnly />
        </div>
        <div className="info-group">
          <label>성별</label>
          <input type="text" value={user?.gender || ""} readOnly />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>관심사</legend>
          {Object.entries(interestCategories).map(([category, interests]) => (
            <div key={category} className="interest-category">
              <h3>{category}</h3>
              <div className="interest-options">
                {interests.map((interest) => (
                  <div key={interest}>
                    <input
                      type="checkbox"
                      id={interest}
                      name="subInterest"
                      value={interest}
                      checked={formData.subInterest.includes(interest)}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={interest}>{interest}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </fieldset>
        <button type="submit" className="save-button">
          수 정
        </button>
      </form>
    </div>
  );
};

export default MyPage;
