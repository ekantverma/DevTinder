import React, { useEffect } from "react";
import { addRequests, removeRequests } from "../utils/requestsSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ConnectionRequest = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequests(_id));
    } catch (err) {
      console.log("Error reviewing request:", err);
    }
  };

  const Requests = async () => {
    try {
      const req = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(req.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Requests();
  }, []);

  if (!requests) {
    return (
      <h1 className="text-center my-0 pt-20 text-xl font-semibold">
        Loading requests...
      </h1>
    );
  }

  if (requests.length === 0) {
    return (
      <h1 className="text-center my-0 pt-20 text-xl font-semibold  my-0 pt-20 flex items-center justify-center h-screen">
        No requests found!
      </h1>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-base-100 via-base-200 to-base-300 min-h-screen my-0 pt-20">
      <h1 className="text-center text-2xl font-bold text-white mb-6">
        Connection Requests
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {requests.map((request) => (
          <div
            key={request._id}
            className="p-6 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/20 text-white flex flex-col items-center justify-between space-y-4"
          >
            {/* User Info */}
            <div className="flex items-center">
              <img
                src={
                  request.fromUserId.photoUrl ||
                  "http://placekitten.com/200/200"
                }
                alt="User avatar"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">
                  {request.fromUserId.firstName +
                    " " +
                    request.fromUserId.lastName}
                </h2>
                <p className="text-gray-300">{request.email}</p>
              </div>
            </div>

            {/* About Section */}
            <div className="text-center text-sm text-gray-200">
              {request.fromUserId.about ||
                "No additional information provided."}
            </div>

            {/* Sent Time */}
            <div className="text-gray-400 text-xs">
              Sent at:{" "}
              {new Date(request.createdAt).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                ✅ Accept
              </button>
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                ❌ Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionRequest;
