const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcryptjs");
const User = require("../model/user.js");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, email, password, gender } = req.body;

    const hashpassword = await bcrypt.hash(password, 2);
    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashpassword,
      gender,
    });

    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("error saving user" + err);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new Error("Invalid Credentail");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //generate the token
      const token = await user.getJWT();
      //send the token as user's cookie
      res.cookie("token", token);

      res.send("user login sucessfully");
    } else {
      throw new Error("Invalid Credentail");
    }
  } catch (err) {
    res.status(400).send("something went wrong: " + err);
  }
});

module.exports = authRouter;
