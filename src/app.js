const express = require("express");
const connectDB= require("./config/database.js")
const app = express();

const User = require("./model/user.js")

app.use(express.json())

app.post("/signup", async (req,res)=>{
    await console.log(req.body)
    const user = new User(req.body)
    await user.save()
    res.send("user created successfully")
})

app.get("/user",async (req,res)=>{
    const userEmail = req.body.email;
    try{
        const user = await User.findOne({email:userEmail})
        res.send(user)
    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
})

// feed api get/feed get all users data from database
app.get("/feed",async (req,res)=>{
    try{ 
        const user = await User.find({})
        res.send(user)

    }
    catch(err){
        res.status(400).send("Something went wrong")
    }

})


app.delete("/user",async (req,res)=>{

    const userId=req.body.userId
    try{
        const user= await User.findByIdAndDelete(userId)
        res.send("user delete")
    }
    catch(err){
        res.status(400).send("something went wrong")
    }
})

app.patch("/user",async(req,res)=>{
    const userId=req.body.userId
    const data=req.body;
    try{
        const user= await User.findByIdAndUpdate(userId,data)
        res.send("user update")


    }catch(err){
        res.status(400).send("something went wrong")
    }

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
