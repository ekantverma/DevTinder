import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import addFeed from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  console.log(feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(`${BASE_URL}/feed?limit=1&page=1`, {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div>
      <h1>Feed Cards</h1>
    </div>
  );
};

export default Feed;
