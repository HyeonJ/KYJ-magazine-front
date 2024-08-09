import React from "react";
import { Link } from "react-router-dom";
import "./SignupPage.css";

const SignupPage = () => {
  return (
    <div className="signup-page">
      <h1 className="signup-title">KYJ Magazine</h1>
      <h2>회원가입</h2>
      <form className="signup-form">
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

        <label htmlFor="name">이름</label>
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

        <fieldset>
          <legend>관심사</legend>

          <div className="interest-category">
            <h3>문화</h3>
            <div className="interest-options">
              <div>
                <input
                  type="checkbox"
                  id="movie"
                  name="interests"
                  value="movie"
                />
                <label htmlFor="movie">영화/드라마</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="music"
                  name="interests"
                  value="music"
                />
                <label htmlFor="music">음악</label>
              </div>
              <div>
                <input type="checkbox" id="art" name="interests" value="art" />
                <label htmlFor="art">미술/전시</label>
              </div>
            </div>
            <div className="interest-options">
              <div>
                <input
                  type="checkbox"
                  id="literature"
                  name="interests"
                  value="literature"
                />
                <label htmlFor="literature">문학/도서</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="performance"
                  name="interests"
                  value="performance"
                />
                <label htmlFor="performance">공연/뮤지컬</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="traditional"
                  name="interests"
                  value="traditional"
                />
                <label htmlFor="traditional">전통문화/민속</label>
              </div>
            </div>
          </div>

          <div className="interest-category">
            <h3>사회/정치</h3>
            <div className="interest-options">
              <div>
                <input
                  type="checkbox"
                  id="domestic"
                  name="interests"
                  value="domestic"
                />
                <label htmlFor="domestic">국내정치</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="international"
                  name="interests"
                  value="international"
                />
                <label htmlFor="international">국제관계</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="economy"
                  name="interests"
                  value="economy"
                />
                <label htmlFor="economy">경제/금융</label>
              </div>
            </div>
            <div className="interest-options">
              <div>
                <input
                  type="checkbox"
                  id="environment"
                  name="interests"
                  value="environment"
                />
                <label htmlFor="environment">환경/기후변화</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="human-rights"
                  name="interests"
                  value="human-rights"
                />
                <label htmlFor="human-rights">인권/평등</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="education"
                  name="interests"
                  value="education"
                />
                <label htmlFor="education">교육</label>
              </div>
            </div>
          </div>

          <div className="interest-category">
            <h3>IT/과학</h3>
            <div className="interest-options">
              <div>
                <input type="checkbox" id="ai" name="interests" value="ai" />
                <label htmlFor="ai">인공지능/머신러닝</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="mobile"
                  name="interests"
                  value="mobile"
                />
                <label htmlFor="mobile">모바일/앱 기술</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="space"
                  name="interests"
                  value="space"
                />
                <label htmlFor="space">우주/천문학</label>
              </div>
            </div>
            <div className="interest-options">
              <div>
                <input
                  type="checkbox"
                  id="biotech"
                  name="interests"
                  value="biotech"
                />
                <label htmlFor="biotech">생명공학/의료기술</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="robotics"
                  name="interests"
                  value="robotics"
                />
                <label htmlFor="robotics">로봇공학</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="security"
                  name="interests"
                  value="security"
                />
                <label htmlFor="security">사이버보안/블록체인</label>
              </div>
            </div>
          </div>
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
