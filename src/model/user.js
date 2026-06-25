const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLenght: 50,
    },
    lastName: {
      type: String,
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      required: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender Data is not valid");
        }
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    photoUrl: {
      type: String,
      default:
        "https://cdn.vectorstock.com/i/500p/98/18/gray-man-placeholder-portrait-vector-23519818.jpg",
    },
    about: {
      type: String,
      default: "This is default User!",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "shhhhh", {
    expiresIn: "1h",
  });
  return token;
};

userSchema.methods.validatePassword = async function (userInputPassword) {
  const user = this;
  const hashPassword = user.password;
  const isValid = await bcrypt.compare(userInputPassword, hashPassword);
  return isValid;
};

const User = mongoose.model("users", userSchema);

module.exports = User;
