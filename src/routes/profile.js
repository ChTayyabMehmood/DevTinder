const express = require("express");
const User = require("../model/user.js");
const { userAuth } = require("../middleware/auth.js");
const { validatedEditProfileData } = require("../utils/validation.js");
const bcrypt = require("bcryptjs");
const profileRouter = express.Router();
const validator = require("validator");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const isAllowed = validatedEditProfileData(req.body);
    if (!isAllowed) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    res.send(loggedInUser.firstName + " your Profile update successfully");
    console.log(loggedInUser);
    await loggedInUser.save();
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/forgetPassword", async (req, res) => {
  try {
    const { email, firstName, newpassword } = req.body;
    const user = await User.findOne({
      email: email.toLowerCase(),
      firstName: firstName,
    });

    if (!user) {
      throw new Error("User NOT found");
    }
    if (!validator.isStrongPassword(newpassword))
      throw new Error("Password is not strong");

    const hashpassword = await bcrypt.hash(newpassword, 2);
    user.password = hashpassword;
    await user.save();
    res.send("Password Change is sucessfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
