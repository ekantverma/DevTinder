import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import createSocketConnection from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { toUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user._id;
  const firstName = user.firstName;
  const [targetUser, setTargetUser] = useState("");

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", { firstName, userId, toUserId, text: input });
    setInput("");
  };

  const fetchChatMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const chat = await axios.get(`${BASE_URL}/chat/${toUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setMessages(chat.data.messages);
    } catch (err) {
      console.error("Error fetching chat messages:", err.message);
    }
  };

  const fetchChatUser = async () => {
    const targetUser = await axios.get(`${BASE_URL}/userProfile/${toUserId}`);
    setTargetUser(targetUser.data);
  };

  useEffect(() => {
    fetchChatMessages();
    fetchChatUser();
  }, [toUserId]);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName, userId, toUserId });

    socket.on("messageReceived", ({ firstName, text }) => {
      setMessages((messages) => [...messages, { text, firstName }]);
      console.log(firstName + ": " + text);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, toUserId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-row mb-4">
          <img
            className="w-8 h-8 rounded-full"
            src={targetUser.photoUrl}
            alt="User Avatar"
          />
          <span className="flex flex-col ml-5">
            <h1 className="text-xl font-bold text-black dark:text-white">
              {targetUser.firstName} {targetUser.lastName}
            </h1>
            <h6 className="text-gray-400 text-sm">{targetUser ? "Last seen at 5 mins ago" : ""}</h6>
          </span>
        </div>
        <div className="h-96 overflow-y-auto mb-4 border border-gray-300 dark:border-gray-700 p-2 rounded-lg">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat ${
                message.senderId &&
                message.senderId.firstName === user.firstName
                  ? "chat-end"
                  : "chat-start"
              }`}
            >
              <div className="chat-header">
                <span className="chat-name">
                  {message.senderId
                    ? `${message.senderId.firstName} ${message.senderId.lastName}`
                    : "Unknown"}
                </span>
                <time className="text-xs opacity-50"> Just now</time>
              </div>
              <div className="chat-bubble bg-blue-500 text-white p-2 rounded-lg max-w-xs break-words">
                {message.text}
              </div>
              <div className="chat-footer text-xs opacity-50">Sent</div>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-lg mr-2 bg-white dark:bg-gray-700 text-black dark:text-white"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
