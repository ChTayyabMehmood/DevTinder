const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    firstName: {
        type: String,
        },
    lastName: {
        type: String,
         },
    password: {
        type: String,
         },
    age: {
        type: Number,
         },
    gender: {
        type: String,
        required: true },
    email: {
        type: String,
        required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("users", userSchema);

module.exports = User;  