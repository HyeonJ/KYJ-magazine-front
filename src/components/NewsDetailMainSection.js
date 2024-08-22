import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import API_ENDPOINTS from "../config/api";
import Swal from "sweetalert2";

const NewsDetailMainSection = ({ newsData }) => {
  const [newComment, setNewComment] = useState("");
  const [thumbnailSrc, setThumbnailSrc] = useState("/default_thumbnail.webp");
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [userReaction, setUserReaction] = useState(0);

  const fetchReactionCounts = async () => {
    try {
      const likeResponse = await fetch(
        `${API_ENDPOINTS.GET_LIKE}/${newsData.createNewsNum}`
      );
      const dislikeResponse = await fetch(
        `${API_ENDPOINTS.GET_DISLIKE}/${newsData.createNewsNum}`
      );

      if (likeResponse.ok && dislikeResponse.ok) {
        const likeData = await likeResponse.json();
        const dislikeData = await dislikeResponse.json();

        setLikeCount(likeData.count);
        setDislikeCount(dislikeData.count);
      } else {
        console.error("Failed to fetch reaction counts");
      }
    } catch (error) {
      console.error("Error fetching reaction counts:", error);
    }
  };

  const fetchUserReaction = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(
        `${API_ENDPOINTS.CHECK_LIKE}/${newsData.createNewsNum}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserReaction(data.result);
      } else {
        console.error("Failed to fetch user reaction");
      }
    } catch (error) {
      console.error("Error fetching user reaction:", error);
    }
  };

  useEffect(() => {
    if (newsData.thumbnailData) {
      setThumbnailSrc(`${API_ENDPOINTS.BASE_URL}${newsData.thumbnailURL}`);
    }

    fetchReactionCounts();
    fetchUserReaction();
  }, [newsData.thumbnailData, newsData.createNewsNum]);

  const handleReaction = async (type) => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        title: "로그인이 필요합니다",
        text: "좋아요/싫어요 기능을 사용하려면 로그인해 주세요.",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }

    const endpoint =
      type === "like"
        ? API_ENDPOINTS.UPDATE_LIKE
        : API_ENDPOINTS.UPDATE_DISLIKE;
    try {
      const response = await fetch(`${endpoint}/${newsData.createNewsNum}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        await fetchReactionCounts();
        await fetchUserReaction();
      } else {
        console.error(`Failed to update ${type}`);
      }
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log("제출된 댓글:", newComment);
    setNewComment("");
  };

  const getLikeIconStyle = () => {
    return userReaction === 1 ? { color: "skyblue" } : {};
  };

  const getDislikeIconStyle = () => {
    return userReaction === 2 ? { color: "orangered" } : {};
  };

  return (
    <div className="news-detail-main-section">
      <div className="news-detail-main-img-container">
        <img
          className="news-detail-main-img"
          src={thumbnailSrc}
          alt="뉴스 썸네일"
        />
      </div>

      <h2>뉴스 상세 내용</h2>
      <div className="news-content">{newsData.description}</div>

      <hr className="comment-divider" />

      <div className="reaction-icons">
        <div className="reaction-container">
          <button
            className="reaction-button"
            onClick={() => handleReaction("like")}
          >
            <FontAwesomeIcon icon={faFaceSmile} style={getLikeIconStyle()} />
          </button>
          <div className="reaction-info">
            <span className="reaction-text">좋아요</span>
            <span className="count">{likeCount}</span>
          </div>
        </div>
        <div className="reaction-container">
          <button
            className="reaction-button"
            onClick={() => handleReaction("dislike")}
          >
            <FontAwesomeIcon
              icon={faFaceSadTear}
              style={getDislikeIconStyle()}
            />
          </button>
          <div className="reaction-info">
            <span className="reaction-text">싫어요</span>
            <span className="count">{dislikeCount}</span>
          </div>
        </div>
      </div>

      <hr className="comment-divider" />

      {/* 댓글 섹션 (주석 처리된 부분) */}
    </div>
  );
};

export default NewsDetailMainSection;
