const mongoose = require("mongoose");

const connectionRequest = new mongoose.Schema(
  {
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequest.pre("save", function (next) {
  const connectionRequest = this;
  // handle if the from userId and the toUserId is same
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You can't send connection request to yourself");
  }
  next();
});

const connectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequest
);

module.exports = connectionRequestModel;
