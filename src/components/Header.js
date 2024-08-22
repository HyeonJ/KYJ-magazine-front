import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isSearchPage = location.pathname === "/news/search";
  const [isSearchOpen, setIsSearchOpen] = useState(isSearchPage);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (
        !isSearchPage &&
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        !event.target.closest(".header-icon")
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchPage]);

  useEffect(() => {
    setIsSearchOpen(isSearchPage);
    if (isSearchPage) {
      const searchParams = new URLSearchParams(location.search);
      const query = searchParams.get("query");
      if (query) {
        setSearchTerm(decodeURIComponent(query));
      }
    }
  }, [isSearchPage, location.search]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    window.location.href = "/";
    setIsMenuOpen(false);
  };

  const handleMyPage = () => {
    window.location.href = "/mypage";
    setIsMenuOpen(false);
  };

  const toggleSearch = () => {
    if (!isSearchPage) {
      setIsSearchOpen(!isSearchOpen);
      if (!isSearchOpen) {
        setTimeout(() => searchRef.current.focus(), 100);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      Swal.fire({
        title: "검색어를 입력하세요",
        icon: "warning",
        confirmButtonText: "확인",
      });
    } else {
      window.location.href = `/news/search?query=${encodeURIComponent(
        searchTerm.trim()
      )}`;
      if (!isSearchPage) {
        setSearchTerm("");
      }
    }
  };

  const isActiveCategory = (category) => {
    return location.pathname === `/news/category/${category}` ? "active" : "";
  };

  return (
    <header className={`header ${isSearchOpen ? "search-open" : ""}`}>
      <div className="header-content">
        <div className="header-left">
          <a href="/">
            <img className="logo-img" src="/KYJ_logo.png" alt="KYJ Magazine" />
          </a>
        </div>
        <div className="header-center">
          <div className="search-bar" ref={searchRef}>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="궁금하신 뉴스를 검색해보세요."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
        <div className="header-right-wrapper">
          <nav className="header-nav">
            <ul>
              <li>
                <a
                  href="/news/category/culture"
                  className={isActiveCategory("culture")}
                >
                  생활/문화
                </a>
              </li>
              <li>
                <a
                  href="/news/category/society"
                  className={isActiveCategory("society")}
                >
                  정치/사회
                </a>
              </li>
              <li>
                <a
                  href="/news/category/science"
                  className={isActiveCategory("science")}
                >
                  IT과학
                </a>
              </li>
            </ul>
          </nav>
          {user ? (
            <div className="user-menu" ref={menuRef}>
              <FontAwesomeIcon
                icon={faUserCheck}
                className="header-icon"
                color="black"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              {isMenuOpen && (
                <div className="dropdown-menu">
                  <ul>
                    <li>{user.name || "사용자"} 님</li>
                    <li>
                      <button onClick={handleMyPage}>회원정보</button>
                    </li>
                    <li>
                      <button onClick={handleLogout}>로그아웃</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <FontAwesomeIcon
                icon={faUser}
                className="header-icon"
                color="black"
              />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
