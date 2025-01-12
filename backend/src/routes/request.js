const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedRequests = ["interested", "ignored"];
      if (!allowedRequests.includes(status)) {
        throw new Error("Invalid Connection request status!");
      }

      // if to user hai hi nhi databse me to to handle it
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("Invalid Connection request!");
      }

      // if already requests aa rakhi hai or firse bhej rhe hai to handle it
      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingRequest) {
        throw new Error("Connection request already exists!");
      }

      // if khud khud ko hi connection request send kr rha hai to handle it

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({
        message: "Connection request sent successfully",
        data,
      });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "This status is not allowed!" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser.id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res.status(400).json({ message: `Connection Request not found` });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res
        .status(200)
        .json({ message: "Connection Request Accepted Successfully!", data });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);

module.exports = requestRouter;
