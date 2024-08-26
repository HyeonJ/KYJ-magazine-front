import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import API_ENDPOINTS from "../config/api";
import Swal from "sweetalert2";
import "./LoginPage.css";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_ENDPOINTS.SIGNIN, {
        id,
        password,
      });

      if (response.status === 200) {
        login(response.data.userId);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "recommendedArticles",
          response.data.recommendedArticles
        );
        navigate("/");
      } else {
        throw new Error("로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      Swal.fire({
        icon: "error",
        title: "로그인 실패",
        text:
          error.response?.data || "아이디 또는 비밀번호가 올바르지 않습니다.",
        confirmButtonText: "확인",
      });
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
      <div className="signup-link">
        <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
};

export default LoginPage;
