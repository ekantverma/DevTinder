const socket = require("socket.io");
const crypto = require("crypto");

const getSecretRoomId = ({userId, toUserId}) => {
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
      const roomId = getSecretRoomId(userId, toUserId)
      console.log(firstName + " Joined the room : " + roomId);
      socket.join(roomId);
    });

    socket.on("sendMessage", ({ firstName, userId, toUserId, text }) => {
      const roomId = getSecretRoomId(userId, toUserId)
      console.log(firstName + " Sent a message : " + text);
      io.to(roomId).emit("messageReceived", { firstName, text });
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
