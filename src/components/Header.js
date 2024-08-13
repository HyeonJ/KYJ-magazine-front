import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faUser,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleMyPage = () => {
    navigate("/mypage");
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1>
            <a href="/">KYJ Magazine</a>
          </h1>
          <nav className="header-nav">
            <ul>
              <li>
                <a href="/">문화</a>
              </li>
              <li>
                <a href="/about">사회</a>
              </li>
              <li>
                <a href="/contact">IT과학</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header-right">
          <FontAwesomeIcon icon={faSearch} className="header-icon" />
          <FontAwesomeIcon icon={faBell} className="header-icon" />
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
