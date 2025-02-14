const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chats");

const getSecretRoomId = ({ userId, toUserId }) => {
  return crypto
    .createHash("sha256")
    .update([userId, toUserId].sort().join("_"))
    .digest("hex");
};
const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: ["http://localhost:5173"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    //Handle events
    socket.on("joinChat", ({ firstName, userId, toUserId }) => {
      const roomId = getSecretRoomId(userId, toUserId);
      console.log(firstName + " Joined the room : " + roomId);
      socket.join(roomId);
    });

    socket.on("sendMessage", async ({ firstName, userId, toUserId, text }) => {
      //Logic to save msg's in database
      try {
        const roomId = getSecretRoomId(userId, toUserId);
        console.log(firstName + " Sent a message : " + text);

        // Todo - if the user id and touserId are the freinds means status is accepted then u can send msg so verify it.
        // else return error message.


        let chat = await Chat.findOne({
          participants: { $all: [userId, toUserId] },
        });

        if (!chat) {
          chat = new Chat({
            participants: [userId, toUserId],
            messages: [],
          });
        }
        chat.messages.push({
          senderId: userId,
          text,
        });
        await chat.save();
        io.to(roomId).emit("messageReceived", { firstName, text });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
