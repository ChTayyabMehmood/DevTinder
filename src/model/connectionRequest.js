const mongoose = require("mongoose");

const connectionRequestScheme = new mongoose.Schema(
  {
    fromUserId: {
      type: String,
      required: true,
    },
    toUserId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignore", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  },
);

connectionRequestScheme.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

connectionRequestScheme.pre("save", async function () {
  const connectionRequest = this;
  if (
    connectionRequest.fromUserId.toString() ===
    connectionRequest.toUserId.toString()
  )
    throw new Error("Cannot send connection request to yourself");
});

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestScheme,
);

module.exports = ConnectionRequestModel;
