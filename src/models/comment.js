const mongoose = require("mongoose");

const comment = new mongoose.Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogsSchema",
        required: true
    },
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