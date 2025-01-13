const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

const USER_DATA = "firstName lastName photoUrl age gender skills about";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    // Logic to retrieve received requests goes here
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate(
      "fromUserId",
      "firstName lastName photoUrl age gender skills about"
    );

    res.json({
      message: "Connection requests fetched successfully!",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    // Logic to retrieve connections goes here
    const connections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      status: "accepted",
    }).populate("fromUserId toUserId", USER_DATA);

    const data = connections.map((row) => {
        if(row.fromUserId._id.equals(loggedInUser._id)) {
            return row.toUserId;
        }
        return row.fromUserId
    });
    res.json({
      message: "Connections fetched successfully!",
      data,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try{
    const loggedInUser = req.user;
    // User can see all the users exept this users
    // 1. if user ignored -> not again show
    // 2. if user already exists -> not again show
    // 3. dont show user itself
    // 4. else show all the users
    // 
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
})

module.exports = userRouter;
