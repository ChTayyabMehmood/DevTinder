const express = require("express")
const app =express()

app.use('/home',(req,res)=>{
    res.send("hello from the okay");

})

app.get('/user',(req,res)=>{
    res.send({"firstName":"Tayyab","lastName":"Jutt"})
})

app.post('/user',(req,res)=>{
    console.log("saving data to db")
      res.send("Data saved successfully")
})

app.delete('/user',(req,res)=>{
    res.send("Data is deleted")
})


app.use('/user',(req,res)=>{
    res.send("this is message from use")
})


app.listen(3000 , ()=>{
    console.log("server is listen sucessfull")
});

