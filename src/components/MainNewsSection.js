import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const MainNewsSection = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMoreData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/createNews/list`);
      const data = await response.json();

      console.log(data);

      if (data.length === 0) {
        setHasMore(false);
      } else {
        const newItems = data.map((article) => ({
          id: article.id, // API 응답에 id가 포함되어 있다고 가정합니다
          title: article.title,
          // thumbnail: article.thumbnail
          thumbnail: "/default_thumbnail.webp",
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
    fetchMoreData();
  }, []);

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
