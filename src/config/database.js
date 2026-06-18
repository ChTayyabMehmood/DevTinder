const mongoose = require('mongoose')
const connectDB=async ()=>{
    await mongoose.connect("mongodb+srv://mehmoodtayyab235:mehmoodtayyab235@cluster0.tmpcaxe.mongodb.net/DevTinder")
}

module.exports=connectDB
