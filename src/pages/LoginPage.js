import React from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login-page">
      <h1 className="login-title">KYJ Magazine</h1>
      <h2>로그인</h2>
      <form className="login-form">
        <input type="text" placeholder="이메일주소 또는 아이디" />
        <input type="password" placeholder="비밀번호" />
        <button type="submit">로그인</button>
      </form>
      <div className="login-links">
        <Link to="/signin">회원가입</Link>
        <Link to="/">가입하기/찾기</Link>
        <Link to="/">비밀번호 재설정</Link>
      </div>
    </div>
  );
};

export default LoginPage;
