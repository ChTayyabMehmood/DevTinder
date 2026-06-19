const express = require("express");
const connectDB = require("./config/database.js");
const app = express();

const User = require("./model/user.js");
//it is middle vere mean it automatically convert the json into js object
app.use(express.json());

// now how we can sent signup in dynmaic

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("error saving user" + err);
  }
});

//get user by email:
app.get("/User", async (req, res) => {
  const UserEmail = req.body.email;
  try {
    const user = await User.findOne({ email: UserEmail });
    if (user.length == 0) {
      return res.status(404).send("user not found");
    }
    return res.send(user);
  } catch (err) {
    return res.status(400).send("something went wrong");
  }
});

// feed API -> GET /feed get all user of database;
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status.send("something went wrong");
  }
});

// delete api by email

app.delete("/user", async (req, res) => {
  const UserEmail = req.body.email;
  const user = await User.findOneAndDelete({ email: UserEmail });
  if (!user) {
    return res.status(404).send("User not found");
  }

  return res.send("User deleted successfully");
});

// delete api -> user by ID
app.delete("/id", async (req, res) => {
  const userID = req.body.userID;

  try {
    const user = await User.findByIdAndDelete(userID);
    if (!user) {
      return res.status(404).send("user not founded");
    }
    return res.send("user delete successfully");
  } catch (err) {
    res.send("something went wrong");
  }
});

//update the data of user
app.patch("/user/:userID", async (req, res) => {
  const userID = req.params?.userID;
  const data = req.body;

  try {
    const ALLOWED_Update = [
      "userID",
      "photoUrl",
      "age",
      "password",
      "about",
      "skills",
    ];
    const isAllowUpdate = Object.keys(data).every((k) =>
      ALLOWED_Update.includes(k),
    );

    if (!isAllowUpdate) {
      throw new Error("update is not allowed");
    }

    const user = await User.findByIdAndUpdate(userID, data, {
      returnDocument: "before",
    });

    if (!user) {
      return res.status(404).send("user not founded");
    }
    return res.send("user update successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//update user by email id
app.patch("/userbyEmail", async (req, res) => {
  const userEmail = req.body.userEmail;
  const data = req.body;

  try {
    const user = await User.findOneAndUpdate({ email: userEmail }, data);
    if (!user) {
      return res.status(404).send("user not founded");
    }
    console.log(user);
    return res.send("user update successfully");
  } catch (err) {
    res.send("something went wrong");
  }
});

//connect to db and create server
connectDB()
  .then(() => {
    console.log("database is connect sucessfully");
    app.listen(3000, () => {
      console.log("server is listening");
    });
  })
  .catch((err) => {
    console.error("database cannot be connected", err);
  });
