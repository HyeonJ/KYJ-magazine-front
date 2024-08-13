import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./MyPage.css";

const MyPage = () => {
  const { user, updateUserProfile } = useAuth();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleNicknameChange = (e) => setNickname(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ nickname, email });
      alert("회원정보가 업데이트되었습니다.");
    } catch (error) {
      console.error("프로필 업데이트 오류:", error);
      alert("회원정보 업데이트에 실패했습니다.");
    }
  };

  return (
    <div className="my-page">
      <h2>회원정보</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>닉네임</label>
          <div className="input-group">
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
            />
            <button type="button" className="change-button">
              수정
            </button>
          </div>
        </div>
        <div className="form-group">
          <label>가입일시</label>
          <input type="text" value={user?.createdAt || ""} readOnly />
        </div>
        <div className="form-group">
          <label>대표 이메일</label>
          <div className="input-group">
            <input type="email" value={email} onChange={handleEmailChange} />
            <button type="button" className="change-button">
              수정
            </button>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="save-button">
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyPage;
