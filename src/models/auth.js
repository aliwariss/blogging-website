const mongoose = require("mongoose");

const auth = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
      },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        enum: ["User" , "Admin"],
        default: "User"
    }
})

const authSchema = mongoose.model("authSchema",auth);
module.exports = authSchema;