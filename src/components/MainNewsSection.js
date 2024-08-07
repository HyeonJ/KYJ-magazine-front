import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const MainNewsSection = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMoreData = () => {
    setTimeout(() => {
      const newItems = Array.from({ length: 10 }, (_, index) => ({
        id: items.length + index + 1,
        title: `News Title ${items.length + index + 1}`,
        thumbnail: `https://picsum.photos/400/200?random=${
          items.length + index + 1
        }`,
      }));

      setItems([...items, ...newItems]);
      setPage(page + 1);

      if (page > 5) {
        setHasMore(false);
      }
    }, 1500);
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
