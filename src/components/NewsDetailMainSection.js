import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faFaceSadTear } from "@fortawesome/free-solid-svg-icons";

const NewsDetailMainSection = ({ newsId }) => {
  // 여기서 newsId를 사용하여 실제 뉴스 데이터를 가져오는 로직을 구현할 수 있습니다.
  // 예를 들어, useEffect와 fetch를 사용하여 API에서 데이터를 가져올 수 있습니다.

  const content = Array(20)
    .fill(null)
    .map((_, index) => (
      <p key={index}>
        This is paragraph {index + 1} of the news content. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit.
      </p>
    ));

  const content1 =
    "김우진(32)은 4일 파리 올림픽 양궁 남자 개인전 결승에서 브래디 엘리슨(미국)을 꺾고 금메달을 땄다. 이번 대회 한국의 10번째 금메달이다. 김우진은 세트 점수 5-5(27-29, 28-24, 27-29, 29-27, 30-30)로 비긴 뒤 슛오프 원샷 승부에서 4.9mm 차로 이겼다. 두 선수 모두 10점을 쐈는데 김우진의 화살은 정중앙에서 55.8mm 거리에 꽂혀 60.7mm의 엘리슨보다 가까웠다. 김우진은 단체전, 여자 대표팀 임시현(21)과 팀을 이룬 혼성전에 이어 대회 3관왕에 올랐다. 김우진은 2016년 리우데자네이루, 2021년 도쿄 대회 단체전에서 금메달을 땄고 개인전 우승은 처음이다. 이로써 김우진은 올림픽 통산 5번째 금메달을 목에 걸며 이 부문 한국 선수 1위가 됐다. 김수녕(양궁) 진종오(사격) 전이경(쇼트트랙)이 금메달 4개를 땄다.";

  // 기존 코드는 그대로 유지
  const [newComment, setNewComment] = useState("");

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
          src="https://dimg.donga.com/wps/NEWS/IMAGE/2024/08/05/126332708.2.jpg"
        ></img>
      </div>

      <h2>뉴스 상세 내용</h2>
      <p>뉴스 ID: {newsId}</p>
      <div className="news-content">{content1}</div>

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
