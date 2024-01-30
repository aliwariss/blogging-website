const Boom = require("@hapi/boom");
const userRepo = require("../repository/user");
const adminRepo = require("../repository/admin");
const mongoose = require("mongoose");

exports.addComment = async (payload) => {
  try {
    const addComment = {
      blogId: payload.blogId,
      commentBody: payload.commentBody,
      date: payload.date
    }
    const addingComment = await userRepo.addComment(payload.blogId, payload.userId, addComment);
    return addingComment;
  } catch (error) {
    throw Boom.badRequest(error);
  }
}

exports.likeservices = async (payload) => {
  try {
    // console.log("Received blogId:", payload.blogId);
    if (!mongoose.Types.ObjectId.isValid(payload.blogId)) {
      throw new Error('Invalid blogId');
    }
    const findBlog = await adminRepo.getBlogById(payload.blogId);
    const hasLiked = findBlog.like ? findBlog.like.some(like => like.userId.toString() === payload.userId) : false;
    if (hasLiked) {
      throw Boom.badRequest("Duplicate like attempt detected!!!");
    }
    const blog = await userRepo.likeRepo(payload.blogId, payload.userId)
    return blog;

  } catch (error) {
    throw Boom.badRequest(error);
  }
};

exports.unLike = async (payload) => {
  try {
    const getBlogById = await adminRepo.getBlogById(payload.blogId);
    const ifLiked = getBlogById.like ? getBlogById.like.some(like => like.userId.toString() === payload.userId) : false;
    if (ifLiked) {
      const removeLike = await userRepo.unLike(payload.blogId, payload.userId);
      return removeLike;
    }
  } catch (error) {
    throw Boom.badRequest(error);
  }
}

exports.search = async (query,pageNumber , pageSize) => {
  try {
    const searchBar = await userRepo.search({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } }
      ]
    },pageNumber , pageSize)
    return searchBar;
  } catch (error) {
    throw Boom.badRequest(error);
  }
}

exports.getCommentsById = async (blogId) => {
  try {
    const getComments = await userRepo.getCommentsById(blogId);
    return getComments;
  } catch (error) {
    throw Boom.badRequest(error);
  }
}


