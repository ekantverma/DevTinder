import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { setConnections } from "../utils/connectionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(setConnections(response.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return null;
  }

  if (connections.length === 0) {
    return <h1 className="text-center text-xl font-semibold my-0 pt-20">No connections found!</h1>;
  }

  return (
    <div className="flex flex-col items-center px-5 my-0 pt-20">
      <h1 className="font-bold text-3xl mb-5">Connections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-5xl">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="bg-base-300 shadow-md rounded-lg p-5 flex flex-col items-center text-center"
          >
            <img
              src={connection.photoUrl || "https://via.placeholder.com/100"}
              alt={`${connection.firstName} ${connection.lastName}`}
              className="w-24 h-24 rounded-full mb-4 font-bold"
            />
            <h2 className="font-semibold text-xl">{`${connection.firstName} ${connection.lastName}`}</h2>
            <p className="text-gray-300 text-m">{connection.gender}, {connection.age} years old</p>
            <p className="text-gray-700 mt-2">{connection.about || "No about info available."}</p>
            <Link to={"/chat/" + connection._id}><button className="btn btn-primary">Chat</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
