import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import createSocketConnection from "../utils/socket";


const Chat = () => {
  const { toUserId } = useParams();
  const [messages, setMessages] = useState([{ msg: 'Hello', sender: 'me' }]);
  const [input, setInput] = useState('');
  const user = useSelector((store) => store.user);
  const userId = user._id;

  const sendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { msg: input, sender: 'me' }]);
      setInput('');
    }
  };

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit('joinChat', {userId, toUserId});
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">Chats</h1>
        <div className="h-96 overflow-y-auto mb-4 border border-gray-300 dark:border-gray-700 p-2 rounded-lg">
          {messages.map((message, index) => (
            <div key={index} className={`chat ${message.sender === 'me' ? 'chat-end' : 'chat-start'}`}>
              <div className="chat-header">
              <span className="chat-name">Ekant Verma </span>
                <time className="text-xs opacity-50">Just now</time>
              </div>
              <div className="chat-bubble bg-blue-500 text-white p-2 rounded-lg max-w-xs break-words">
                {message.msg}
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
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
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
