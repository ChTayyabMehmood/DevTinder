const express = require("express");
const userRouter = express.Router();
const User = require("./../model/user");
const { userAuth } = require("../middleware/auth.js");
const ConnectionRequest = require("./../model/connectionRequest.js");
const { connection } = require("mongoose");
const SAFE_USER_STRING = "firstName lastName age photoUrl gender";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const logInUser = req.user;
    const data = await ConnectionRequest.find({
      toUserId: logInUser._id,
      status: "interested",
    }).populate("toUserId", SAFE_USER_STRING);
    // .populate("toUserId", ["firstName", "lastName", "age"]);

    console.log(data);
    res.json({
      data,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const logInUser = req.user;
    const connections = await ConnectionRequest.find({
      status: "accepted",
      $or: [{ toUserId: logInUser._id }, { fromUserId: logInUser._id }],
    })
      .populate("toUserId", SAFE_USER_STRING)
      .populate("fromUserId", SAFE_USER_STRING);

    const friends = connections.map((connection) => {
      if (connection.fromUserId._id.toString() === logInUser._id.toString())
        return connection.toUserId;

      return connection.fromUserId;
    });

    res.json({ friends });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 30 ? 30 : limit;
    const skip = (page - 1) * limit;
    const skip = (page - 1) * limit;
    const logInUser = req.user;
    const connection = await ConnectionRequest.find({
      $or: [{ fromUserId: logInUser._id }, { toUserId: logInUser._id }],
    }).select("fromUserId toUserId");

    const hideUserFromFeed = new Set();

    connection.forEach((req) => {
      hideUserFromFeed.add(req.toUserId);
      hideUserFromFeed.add(req.fromUserId);
    });

    const feedList = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: logInUser._id } },
      ],
    })
      .select(SAFE_USER_STRING)
      .skip(skip)
      .limit(limit);

    res.json({ message: feedList });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = userRouter;

// -GET /user/connections
// -GET /user/requests/received
