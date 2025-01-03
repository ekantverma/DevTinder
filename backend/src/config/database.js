const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect("mongodb+srv://devtinder:awruXjQnDIf0RoOp@devtinder.gaeft.mongodb.net/DevTinder")
}

module.exports = connectDB;