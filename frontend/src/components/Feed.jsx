import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import FeedCard from "./FeedCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed); 
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    

    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
        params: {
          page: 1,
          limit: 10,
        },
      });
      dispatch(setFeed(res?.data?.data));
    } catch (err) {
      console.error("Failed to fetch feed:", err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, [dispatch]);

  if (!feed || feed.length === 0) {
    return <h1 className="text-center my-10 text-xl font-semibold">No Users found!</h1>;
  }

  return (
    <div>
      {feed && feed.length > 0 ? (
        feed.map((item, index) => <FeedCard key={index} feed={item} />)
      ) : (
        <p className="text-center my-10 text-xl font-semibold">Loading feed...</p>
      )}
    </div>
  );
};

export default Feed;
