const express = require("express");
const connectDB= require("./config/database.js")
const app = express();

const User = require("./model/user.js")

app.use(express.json())

app.post("/signup", async (req,res)=>{
   
//     const user= new  User({
//         firstName:"Tayyab",
//         lastName:"Mehmood",
//         password:"123456",
//         age: 19 ,    
//         gender:"Male",     
//         email:"abc@gmail.com",
//         createdAt:Date.now()    
//     })
   
//    await user.save()

    await console.log(req.body)
    const user = new User(req.body)
    await user.save()
    res.send("user created successfully")



})









connectDB().then(()=>{
    console.log("database is connect sucessfully")
    app.listen(3000,()=>{
        console.log("server is listening")
    })
})
.catch((err)=>{
    console.error("database cannot be connected")
})  
