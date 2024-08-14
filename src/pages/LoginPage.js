import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import API_ENDPOINTS from "../config/api";
import "./LoginPage.css";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_ENDPOINTS.SIGNIN}`, {
        id,
        password,
      });
      console.log(response.data);

      if (response.data === "아이디 또는 비밀번호가 잘못되었습니다.") {
      } else {
        login(response.data);
        navigate("/");
      }

      // 여기서 로그인 성공 후 처리를 할 수 있습니다.
      // 예: 토큰 저장, 리다이렉트 등
    } catch (error) {
      console.error("로그인 오류:", error);
      // 여기서 오류 처리를 할 수 있습니다.
      // 예: 오류 메시지 표시
    }
  };

  return (
    <div className="login-page">
      <Link to="/">
        <h1 className="login-title">KYJ Magazine</h1>
      </Link>
      <h2>로그인</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
      <div className="login-links">
        <Link to="/signup">회원가입</Link>
        <Link to="/">가입하기/찾기</Link>
        <Link to="/">비밀번호 재설정</Link>
      </div>
    </div>
  );
};

export default LoginPage;
