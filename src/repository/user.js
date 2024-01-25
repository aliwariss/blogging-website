const commentModel = require("../models/comment");
const blogModel = require("../models/blog");
const mongoose = require("mongoose");

exports.addComment = async (blogId, userId , payload) => {
    return await commentModel.create( {blogId , userId , ...payload} )
}

exports.likeRepo = async (blogId, userId) => {
    // console.log("blogId: ", blogId, "userId: ", userId);
    if (!mongoose.Types.ObjectId.isValid(blogId) || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid blogId or userId');
    }
    const updatedBlog = await blogModel.findOneAndUpdate(
        { _id: blogId }, 
        { $addToSet: { like: { userId } } }, 
        { new: true, runValidators: true }
    );
    return updatedBlog;
};

exports.unLike = async (blogId , userId) => {
    return await blogModel.findOneAndUpdate(
        { _id: blogId } , 
        { $pull: { like: {userId} }}
    );
}

exports.search = async (query) => {
    return await blogModel.find(query);
}

exports.getCommentsById = async (blogId) => {
    return await commentModel.find({blogId: blogId });
}
  
 
 