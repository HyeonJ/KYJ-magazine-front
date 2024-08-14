import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import MainNewsSection from "./components/MainNewsSection";
import MainLeftSection from "./components/MainLeftSection";
import MainRightSection from "./components/MainRightSection";
import NewsDetailPage from "./pages/NewsDetailPage";
import { AuthProvider } from "./contexts/AuthContext";
import "./styles/layout.css";
import "./styles/global.css";

// 새로운 컴포넌트 생성
const MainContent = () => {
  const { category } = useParams();

  return (
    <>
      <Header />
      <main className="main-container">
        <div className="personal-view-wrapper">
          <MainLeftSection />
        </div>
        <div className="infinite-scroll-wrapper">
          <MainNewsSection category={category} />
        </div>
        <div className="category-view-wrapper">
          <MainRightSection />
        </div>
      </main>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/news/category/:category" element={<MainContent />} />
          <Route
            path="/news/:id"
            element={
              <>
                <Header />
                <NewsDetailPage />
              </>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MyPage />} />
          {/* 다른 라우트들 */}
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
