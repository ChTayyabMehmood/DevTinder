const express = require("express");
const User = require("../model/user.js");
const { userAuth } = require("../middleware/auth.js");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("something went wrong: " + err);
  }
});

module.exports = profileRouter;
