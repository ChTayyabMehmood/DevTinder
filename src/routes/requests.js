const express = require("express");
const User = require("../model/user.js");
const { userAuth } = require("../middleware/auth.js");
const requestRouter = express.Router();
const ConnectionRequest = require("./../model/connectionRequest.js");

requestRouter.post(
  "/request/send/:status/:touserId",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user;
      const fromUserId = user._id;
      const toUserId = req.params.touserId;
      const status = req.params.status;

      // didnot have check weather is person is exist in db or not and also the no cross check
      const allowedStatus = ["interested", "ignore"];
      if (!allowedStatus.includes(status))
        throw new Error("Status is invalid only be ignore or accepted");

      const isUserExist = await User.findById(toUserId);
      if (!isUserExist) throw new Error("User not Found");

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest)
        throw new Error("conection are already exist");

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        message: "Connection Requested is Sucessful",
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  },
);

requestRouter.post(
  "/request/review/:status/:requestId",

  userAuth,

  async (req, res) => {
    //kashif -> elon

    //elon will accept the request only if kashif send the interest case

    try {
      const logInUser = req.user;

      const requestId = req.params.requestId;

      const status = req.params.status;

      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Status are not allowed",
        });
      }

      //check if the kashif status -> is interest

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,

        toUserId: logInUser._id,

        status: "interested",
      });

      if (!connectionRequest)
        return res.status(400).json({
          message: "Connection request not found.",
        });

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({
        message: "Connection Requested is Sucessful",

        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  },
);

module.exports = requestRouter;
