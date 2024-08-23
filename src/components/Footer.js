import React from "react";
import "./Footer.css"; // CSS 파일을 import 합니다.

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">KYJ Magazine | 윤상기 고우석 정현인</div>
        <div className="footer-right">
          © 2024 KYJ Magazine. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
