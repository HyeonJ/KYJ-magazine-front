import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import API_ENDPOINTS from "../config/api";
import Swal from "sweetalert2";
import "./MyPage.css";

const MyPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    subInterest: [],
    mainInterest: [],
  });

  const interestCategories = {
    "생활/문화": ["영화", "드라마", "음악", "미술", "문학", "공연"],
    "사회/정치": ["국내정치", "국제", "경제", "환경", "인권", "교육"],
    IT과학: ["인공지능", "모바일", "우주", "생명공학", "로봇", "블록체인"],
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_ENDPOINTS.MYPAGE, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }
      const data = await response.json();
      setFormData({
        name: data.name || "",
        email: data.email || "",
        age: data.age || "",
        gender: data.gender || "",
        subInterest: data.subInterest ? data.subInterest.split(",") : [],
        mainInterest: data.mainInterest ? data.mainInterest.split(",") : [],
      });
    } catch (error) {
      console.error("Error fetching user info:", error);
      Swal.fire({
        title: "오류",
        text: "사용자 정보를 가져오는데 실패했습니다.",
        icon: "error",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    }
  };

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
      const updatedProfile = {
        ...formData,
        mainInterest: formData.mainInterest.join(","),
        subInterest: formData.subInterest.join(","),
      };

      const token = localStorage.getItem("token");
      const response = await fetch(API_ENDPOINTS.MYPAGE, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      Swal.fire({
        title: "성공",
        text: "사용자 정보가 업데이트되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    } catch (error) {
      console.error("프로필 업데이트 오류:", error);
      Swal.fire({
        title: "오류",
        text: "사용자 정보 수정에 실패했습니다.",
        icon: "error",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <div className="my-page">
      <Link to="/">
        <h1 className="login-title">KYJ Magazine</h1>
      </Link>
      <h2>회원정보</h2>
      <div className="user-info">
        <div className="info-group">
          <label>이름</label>
          <input type="text" value={formData.name} readOnly />
        </div>
        <div className="info-group">
          <label>이메일</label>
          <input type="email" value={formData.email} readOnly />
        </div>
        <div className="info-group">
          <label>나이</label>
          <input type="text" value={formData.age} readOnly />
        </div>
        <div className="info-group">
          <label>성별</label>
          <input type="text" value={formData.gender} readOnly />
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
