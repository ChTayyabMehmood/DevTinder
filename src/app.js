const express = require("express")
const app =express()
app.listen(3000 , ()=>{
    console.log("server is listen sucessfull")
});
app.use('/home',(req,res)=>{
    res.send("hello from the okay");

})