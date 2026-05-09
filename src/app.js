const express = require("express");
const app = express();

const {adminAuth,userAuth}=require('./middleware/auth.js')

app.use('/admin',adminAuth)

app.use("/user",(req,res)=>{
    res.send("sending the user profile data")
})

app.use("/admin/getAllData",(req,res)=>{
    res.send("send all data");
})

app.use("/admin/deleteAllUser",(req,res)=>{
    res.send("delete all Data")
})

app.listen(3000, () => {
  console.log("server is listen sucessfull");
});
