import React from "react";
import { Link } from "react-router-dom";
import "./SigninPage.css";

const SigninPage = () => {
  return (
    <div className="signin-page">
      <h1 className="signin-title">KYJ Magazine</h1>
      <h2>회원가입</h2>
      <form className="signin-form">
        <label htmlFor="username">아이디</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" name="password" required />

        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
        />

        <label htmlFor="name">이름?닉네임?</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">이메일주소</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="age">나이</label>
        <input type="number" id="age" name="age" required />

        <label htmlFor="gender">성별</label>
        <select id="gender" name="gender" required>
          <option value="">선택하세요</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>

        <button type="submit">가입하기</button>
      </form>
      <div className="signin-links">
        <Link to="/login">이미 계정이 있으신가요? 로그인</Link>
      </div>
    </div>
  );
};

export default SigninPage;
