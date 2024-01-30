const adminRepo = require("../repository/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Boom = require("@hapi/boom");
const slugify = require("slugify");

exports.addBlog = async (payload) => {
    try {
        const slug = slugify(payload.title, { lower: true}).toLowerCase()
        const createPayload = {
            title: payload.title,
            description: payload.description,
            images: payload.images,
            thumbnail: payload.thumbnail,
            tags: payload.tags,
            category: payload.category,
            slug: slug
        }
        const addingBlog = await adminRepo.addBlog(createPayload);
        return addingBlog;
    } catch (error) {
        throw Boom.badRequest(error);
    }
}

exports.updateBlog = async (payload) => {
    try {
        const slug = slugify(payload.title, {lower : true}).toLowerCase()
        const updatePayload = {};
        if(payload.title){
            updatePayload.title = payload.title;
        }
        if(payload.description){
            updatePayload.description = payload.description;
        }
        if(payload.images){
            updatePayload.images = payload.images;
        }
        if(payload.thumbnail){
            updatePayload.thumbnail = payload.thumbnail;
        }
        if(payload.tags){
            updatePayload.tags = payload.tags;
        }
        if(payload.category){
            updatePayload.category = payload.category;
        }
        
            updatePayload.slug = slug;
        
        if(Object.keys(updatePayload).length > 0){
            const updateBlog = await adminRepo.updateBlog(payload.blogId, updatePayload);
            return updateBlog;
        }
    } catch (error) {
        throw Boom.badRequest(error);
    }
}

exports.deleteBlog = async (id) => {
    try{
        var deleteBlog = await adminRepo.deleteBlog(id);
        return deleteBlog;
    }catch(error){
        throw Boom.badRequest(error);
    }

}

exports.getAllBlogs = async (pageNumber , pageSize) => {
    try {
        const getAllBlogs = await adminRepo.getAllBlogs(pageNumber , pageSize);
        return getAllBlogs;
    } catch (error) {
        throw Boom.badRequest(error);
    }
}

exports.getBlogById = async (id) => {
    try {
        const getBlogById = await adminRepo.getBlogById(id);
        return getBlogById;
    } catch (error) {
        throw Boom.badRequest(error);
    }
}
