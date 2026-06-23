const jwt = require("jsonwebtoken");
const User = require("../model/user");
const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAuth = token === "xyz";
  if (!isAuth) res.status(401).send("unAuthorized Admin ");
  else next();
};

const userAuth = async (req, res, next) => {
  //read the token from the req.cookie
  //validate the token
  //Find the user
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("token invalid");

    const decodedObj = await jwt.verify(token, "shhhhh");
    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not found");
    }
    req.user = user; // send the user as req, so didnot need to call again db for user find
    next();
  } catch (err) {
    res.status(400).send("something went wrong " + err);
  }
};

module.exports = { userAuth, adminAuth };
