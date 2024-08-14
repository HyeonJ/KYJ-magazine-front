import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import API_ENDPOINTS from "../config/api";
import { Link } from "react-router-dom";

const MainNewsSection = ({ category }) => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const fetchMoreData = async () => {
    try {
      let url;
      if (["culture", "society", "science"].includes(category)) {
        url = `${API_ENDPOINTS.NEWS_LIST}/${category}?page=${page}`;
      } else {
        url = `${API_ENDPOINTS.NEWS_LIST}?page=${page}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      console.log(data);

      if (data.content.length === 0) {
        setHasMore(false);
      } else {
        const newItems = data.content.map((article) => ({
          id: article.createNewsNum,
          title: article.title,
          thumbnail: article.thumbnailURL
            ? `${API_ENDPOINTS.BASE_URL}${article.thumbnailURL}`
            : "/default_thumbnail.webp",
        }));

        setItems((prevItems) => [...prevItems, ...newItems]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    setItems([]); // 카테고리가 변경될 때 items 초기화
    setPage(0); // 페이지 번호 초기화
    setHasMore(true); // hasMore 초기화
    fetchMoreData();
  }, [category]); // category가 변경될 때마다 useEffect 실행

  return (
    <div
      id="scrollableDiv"
      className="scrollable-container infinite-scroll-wrapper"
    >
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>You've seen all the news</b>
          </p>
        }
      >
        {items.map((item) => (
          <div key={item.id} className="news-item">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="news-thumbnail"
            />
            <h3 className="news-title">
              <Link to={`/news/${item.id}`}>{item.title}</Link>
            </h3>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default MainNewsSection;
