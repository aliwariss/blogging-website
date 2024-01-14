const mongoose = require("mongoose");

const comment = new mongoose.Schema({
    commentBody: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const commentSchema = mongoose.model("commentSchema",comment);
module.exports = commentSchema;