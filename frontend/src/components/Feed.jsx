import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import FeedCard from "./FeedCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [isAnimating, setIsAnimating] = useState(false); 
  const [animationClass, setAnimationClass] = useState(""); 

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

  const handleAction = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true); 

    setAnimationClass(direction === "left" ? "animate-move-left" : "animate-move-right");

    setTimeout(() => {
      setAnimationClass(""); 
      setCurrentIndex((prevIndex) => prevIndex + 1); 
      setIsAnimating(false); 
    }, 300); 
  };

  if (!feed || feed.length === 0 || currentIndex >= feed.length) {
    return <h1 className="text-center my-10 text-xl font-semibold text-gray-600">No more developers found!</h1>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-4">
      <div className={`w-full max-w-md transition-all ${animationClass}`}>
        <FeedCard
          feed={feed[currentIndex]}
          onInterested={() => handleAction("left")}
          onIgnored={() => handleAction("right")}
        />
      </div>
    </div>
  );
};

export default Feed;
