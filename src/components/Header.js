import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
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
          <Link to="/login">
            <FontAwesomeIcon
              icon={faUser}
              className="header-icon"
              color="black"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
