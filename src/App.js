import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainNewsSection from "./components/MainNewsSection";
import MainLeftSection from "./components/MainLeftSection";
import MainRightSection from "./components/MainRightSection";
import NewsDetailPage from "./pages/NewsDetailPage";
import "./styles/layout.css";
import "./styles/global.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <main className="main-container">
                <div className="personal-view-wrapper">
                  <MainLeftSection />
                </div>
                <div className="infinite-scroll-wrapper">
                  <MainNewsSection />
                </div>
                <div className="category-view-wrapper">
                  <MainRightSection />
                </div>
              </main>
            </>
          }
        />
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
        <Route path="/signin" element={<SignupPage />} />
        {/* 다른 라우트들 */}
      </Routes>
    </div>
  );
}

export default App;
