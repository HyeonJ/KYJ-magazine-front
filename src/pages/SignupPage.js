import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    name: "",
    email: "",
    age: "",
    gender: "",
    mainInterest: [],
    subInterest: [],
  });

  const interestCategories = {
    "생활/문화": ["영화/드라마", "음악", "미술", "문학", "공연", "전통문화"],
    "정치/사회": ["국내정치", "국제", "경제", "환경", "인권", "교육"],
    IT과학: ["인공지능/AI", "모바일", "우주", "생명공학", "로봇", "블록체인"],
  };

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
    const formDataToSend = {
      ...formData,
      mainInterest: formData.mainInterest.join(","),
      subInterest: formData.subInterest.join(","),
    };

    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      if (response.ok) {
        // 성공적으로 회원가입이 완료된 경우
        alert("회원가입이 완료되었습니다.");
        navigate("/login"); // 로그인 페이지로 리다이렉트
      } else {
        // 서버에서 에러 응답을 받은 경우
        const errorData = await response.json();
        alert(`회원가입 실패: ${errorData.message}`);
      }
    } catch (error) {
      // 네트워크 오류 등의 예외가 발생한 경우
      console.error("회원가입 중 오류 발생:", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="signup-page">
      <h1 className="signup-title">KYJ Magazine</h1>
      <h2>회원가입</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="id">아이디</label>
        <input
          type="text"
          id="id"
          name="id"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="email">이메일주소</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="age">나이</label>
        <input
          type="number"
          id="age"
          name="age"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="gender">성별</label>
        <select id="gender" name="gender" required onChange={handleInputChange}>
          <option value="">선택하세요</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>

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
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={interest}>{interest}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </fieldset>

        <button type="submit">가입하기</button>
      </form>
      <div className="signup-links">
        <Link to="/login">이미 계정이 있으신가요? 로그인</Link>
      </div>
    </div>
  );
};

export default SignupPage;
