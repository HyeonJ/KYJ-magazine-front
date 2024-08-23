import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_ENDPOINTS from "../config/api";
import "./SignupPage.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    name: "",
    email: "",
    age: "",
    gender: "",
    mainInterest: [],
    subInterest: [],
  });

  const [idAvailable, setIdAvailable] = useState(null);
  const [emailAvailable, setEmailAvailable] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(null);

  const interestCategories = {
    "생활/문화": ["영화", "드라마", "음악", "미술", "문학", "공연"],
    "정치/사회": ["정치", "국제", "경제", "환경", "인권", "교육"],
    IT과학: ["인공지능", "모바일", "우주", "생명공학", "로봇", "블록체인"],
  };

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Reset availability states when input changes
    if (name === "id") setIdAvailable(null);
    if (name === "email") setEmailAvailable(null);

    // Check password match when either password or passwordConfirm changes
    if (name === "password" || name === "passwordConfirm") {
      const otherField = name === "password" ? "passwordConfirm" : "password";
      const otherValue = formData[otherField];

      if (value === "" && otherValue === "") {
        setPasswordMatch(null);
      } else {
        setPasswordMatch(value === otherValue);
      }
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

  const checkIdAvailability = async () => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.ID_VALIDATION}?id=${formData.id}`
      );

      const data = await response.json();
      if (data.result === "중복") setIdAvailable(false);
      else setIdAvailable(true);
    } catch (error) {
      console.error("ID 중복 확인 중 오류 발생:", error);
      alert("ID 중복 확인 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const checkEmailAvailability = async () => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.EMAIL_VALIDATION}?email=${formData.email}`
      );
      const data = await response.json();
      if (data.result === "중복") setEmailAvailable(false);
      else setEmailAvailable(true);
    } catch (error) {
      console.error("이메일 중복 확인 중 오류 발생:", error);
      alert("이메일 중복 확인 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (idAvailable !== true || emailAvailable !== true) {
      alert("ID와 이메일 중복 확인을 먼저 해주세요.");
      return;
    }

    if (!passwordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const formDataToSend = {
      ...formData,
      mainInterest: formData.mainInterest.join(","),
      subInterest: formData.subInterest.join(","),
    };

    // Remove passwordConfirm from the data to be sent
    delete formDataToSend.passwordConfirm;

    try {
      const response = await fetch(`${API_ENDPOINTS.SIGNUP}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      if (response.ok) {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(`회원가입 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="signup-page">
      <a href="/">
        <h1 className="signup-title">KYJ Magazine</h1>
      </a>
      <h2>회원가입</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="id">아이디</label>
        <div className="input-group">
          <input
            type="text"
            id="id"
            name="id"
            required
            onChange={handleInputChange}
          />
          <button
            type="button"
            onClick={checkIdAvailability}
            className="check-button"
          >
            중복확인
          </button>
        </div>
        {idAvailable !== null && (
          <p className={idAvailable ? "available" : "unavailable"}>
            {idAvailable ? "사용 가능한 ID입니다." : "이미 사용 중인 ID입니다."}
          </p>
        )}

        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          required
          onChange={handleInputChange}
        />
        {passwordMatch !== null && (
          <p className={passwordMatch ? "available" : "unavailable"}>
            {passwordMatch
              ? "비밀번호가 일치합니다."
              : "비밀번호가 일치하지 않습니다."}
          </p>
        )}

        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="email">이메일주소</label>
        <div className="input-group">
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={handleInputChange}
          />
          <button
            type="button"
            onClick={checkEmailAvailability}
            className="check-button"
          >
            중복확인
          </button>
        </div>
        {emailAvailable !== null && (
          <p className={emailAvailable ? "available" : "unavailable"}>
            {emailAvailable
              ? "사용 가능한 이메일입니다."
              : "이미 사용 중인 이메일입니다."}
          </p>
        )}

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
