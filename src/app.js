const express = require("express");
const connectDB = require("./config/database.js");
const app = express();

const User = require("./model/user.js");
//it is middle vere mean it automatically convert the json into js object
app.use(express.json());

// add data prebuild
// app.post("/signup", async (req, res) => {
//   const userObj = {
//     firstName: "ali",
//     lastName: "khan",
//     password: "kingasad",
//     age: 19,
//     gender: "Male",
//     email: "Pakistan@gmail.com",
//     superNode: "father",
//   };

//   //create a new instance of user model

//   const user = new User(userObj);

// });

// now how we can sent signup in dynmaic

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User created successfully");
  } catch {
    res.status(400).send("error saving user");
  }
});

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
