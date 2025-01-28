import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";

const FeedCard = ({ feed, onInterested, onIgnored }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = feed;
  const dispatch = useDispatch();

  const handleRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId)); // Remove user from the feed
    } catch (err) {
      console.error(err);
    }
  };

  const handleInterested = () => {
    handleRequest("interested", _id);
    onInterested();
  };

  const handleIgnored = () => {
    handleRequest("ignored", _id);
    onIgnored();
  };

  return (
    <div className="card bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-700 max-w-sm mx-auto">
      {/* Image Section */}
      <figure className="relative">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
      </figure>

      {/* Card Content */}
      <div className="card-body p-6">
        <h2 className="card-title text-xl font-bold text-white mb-2">
          {`${firstName} ${lastName}`}
        </h2>
        {age && gender && (
          <p className="text-gray-400 text-sm mb-4">{`${age} years old • ${gender}`}</p>
        )}
        <p className="text-gray-300 text-sm mb-6">{about}</p>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            className="w-full bg-red-500 text-white text-sm font-medium py-2 rounded-lg shadow-md hover:bg-red-600 transition-all"
            onClick={handleIgnored}
          >
            Ignore
          </button>
          <button
            className="w-full bg-green-500 text-white text-sm font-medium py-2 rounded-lg shadow-md hover:bg-green-600 transition-all"
            onClick={handleInterested}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
