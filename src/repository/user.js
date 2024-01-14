const commentModel = require("../models/comment");
const blogModel = require("../models/blog");

exports.addComment = async (blogId, userId , payload) => {
    return await commentModel.create( {blogId , userId , ...payload} )
}

exports.like = async (payload) => {
    return await blogModel.findByIdAndUpdate(
        payload.blogId,
        { $pull: { like: { userId: payload.userId } } },
        { safe: true, multi: true }
    ).then(() => {
        return blogModel.findByIdAndUpdate(
            payload.blogId,
            { $push: { like: { userId: payload.userId } } },
            { safe: true, upsert: true, new: true }
        );
    });
  }
  
 
 