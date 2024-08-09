import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faFaceSadTear } from "@fortawesome/free-solid-svg-icons";

const NewsDetailMainSection = ({ newsData }) => {
  // 여기서 newsId를 사용하여 실제 뉴스 데이터를 가져오는 로직을 구현할 수 있습니다.
  // 예를 들어, useEffect와 fetch를 사용하여 API에서 데이터를 가져올 수 있습니다.

  // 기존 코드는 그대로 유지
  const [newComment, setNewComment] = useState("");
  const [thumbnailSrc, setThumbnailSrc] = useState("/default_thumbnail.webp");

  useEffect(() => {
    if (newsData.thumbnailData) {
      // setThumbnailSrc(`data:image/jpeg;base64,${newsData.thumbnailData}`);
      setThumbnailSrc(`http://localhost:8080${newsData.thumbnailURL}`);
    }
  }, [newsData.thumbnailData]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // 여기에 댓글 제출 로직 구현
    console.log("제출된 댓글:", newComment);
    setNewComment(""); // 입력 필드 초기화
  };

  return (
    <div className="news-detail-main-section">
      <div className="news-detail-main-img-container">
        <img
          className="news-detail-main-img"
          src={thumbnailSrc}
          alt="뉴스 썸네일"
        ></img>
      </div>

      <h2>뉴스 상세 내용</h2>
      <div className="news-content">{newsData.description}</div>

      <hr className="comment-divider" />

      <div className="reaction-icons">
        <div className="reaction-container">
          <button className="reaction-button">
            <FontAwesomeIcon icon={faFaceSmile} />
          </button>
          <div className="reaction-info">
            <span className="reaction-text">좋아요</span>
            <span className="count">7</span>
          </div>
        </div>
        <div className="reaction-container">
          <button className="reaction-button">
            <FontAwesomeIcon icon={faFaceSadTear} />
          </button>
          <div className="reaction-info">
            <span className="reaction-text">싫어요</span>
            <span className="count">0</span>
          </div>
        </div>
      </div>

      <hr className="comment-divider" />

      <div className="comments-section">
        <h3>댓글 7</h3>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력해 주세요"
          />
          <button type="submit">등록</button>
        </form>

        <h4>추천 받은 댓글</h4>
        {/* 여기에 기존 댓글들을 렌더링하는 로직 추가 */}
        <div className="comment">
          <p>
            <strong>포청천</strong> 2024-08-05 06:53:34
          </p>
          <p>
            대한민국은 위대하다! 무더위를 통고 선전하는 우리 선수들 모두
            화이팅!!
          </p>
          <div className="comment-reactions">
            <span>👍 18</span>
            <span>👎 0</span>
          </div>
        </div>
        {/* 다른 댓글들도 비슷한 구조로 추가 */}
      </div>

      <button className="view-all-comments">전체 댓글 보기</button>
    </div>
  );
};

export default NewsDetailMainSection;
