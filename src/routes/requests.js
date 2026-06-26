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

module.exports = requestRouter;
