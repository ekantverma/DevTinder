const express = require('express');
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  // Logic to send connection request goes here
  res.send("Sended connection request");
});

module.exports = requestRouter; 
