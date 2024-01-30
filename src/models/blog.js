const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const { default: slugify } = require("slugify");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true,
        set: (value) => slugify(value, {lower : true})
    },
    like: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "authSchema",
                required: true
            },
            _id: false
        }
    ]
})

blogSchema.plugin(mongoosePaginate);

const blogsSchema = mongoose.model("blogsSchema",blogSchema);
module.exports = blogsSchema;