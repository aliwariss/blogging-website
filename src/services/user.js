const Boom = require("@hapi/boom");
const userRepo = require("../repository/user");
const adminRepo = require("../repository/admin");
const mongoose = require("mongoose");

exports.addComment = async (payload) => {
    try {
        const addComment = {
            commentBody: payload.commentBody,
            date: payload.date
        }
        const addingComment = await userRepo.addComment(payload.blogId , payload.userId , addComment);
        return addingComment;
    } catch (error) {
        throw Boom.badRequest(error);
    }
}

exports.like = async (payload) => {
    try{
        if (!mongoose.Types.ObjectId.isValid(payload.blogId)) {
            throw new Error('Invalid blogId');
        }
        const blog = await adminRepo.getBlogById(payload.blogId);
        console.log(blog)
        if(blog){
            const hasLiked = blog.like.some(liked => liked.userId === payload.userId);
            console.log(hasLiked)
            if(hasLiked){
                return new Error("Blog is already liked!!!")
            } else {
                const result = await userRepo.like(payload);
                console.log(result)
                return result;
            }
        } else {
            throw new Error('Blog not found');
        }
    } catch(error){
        throw Boom.badRequest(error)
    }
 }
 
 