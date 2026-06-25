const express = require("express");
const User = require("../model/user.js");
const { userAuth } = require("../middleware/auth.js");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user.firstName + " send the connection request");
  } catch (err) {
    res.status(400).send("something went wrong: " + err);
  }
});

module.exports = requestRouter;
