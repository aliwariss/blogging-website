const services = require("../services/admin");

exports.addBlog = async (req , res) => {
    try {
        const payload = {
            title: req.body.title,
            description: req.body.description,
            images: req.body.images,
            thumbnail: req.body.thumbnail,
            tags: req.body.tags,
            category: req.body.category,
            slug: req.body.category
        }
        const result = await services.addBlog(payload);
        res.status(200).json({data : result});
    } catch (error) {
        console.log(error)
        res.status(400).json({error: "Can't add blog"})
    }
}

exports.updateBlog = async (req , res) => {
    try {
        const blogId = req.params.id
        const payload = {
            blogId: blogId,
            title: req.body.title,
            description: req.body.description,
            images: req.body.description,
            thumbnail: req.body.thumbnail,
            tags: req.body.tags,
            category: req.body.category,
            slug: req.body.slug
        }
        const result = await services.updateBlog(payload);
        return res.status(200).json({data : result});
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: "Can't update blog"});
    }
}

exports.deleteBlog = async (req , res) => {
    try {
        const blogId = req.params.id;
        const result = await services.deleteBlog(blogId);
        return res.status(200).json({data : result});
    } catch (error) {
        return res.status(400).json({error: "Can't delete blog!!!"})
    }
}

exports.getAllBlogs = async (res) => {
    try {
        const result = await services.getAllBlogs();
        // console.log(result)
        return res.status(200).json({data : result});
    } catch (error) {
        return res.status(400).json({error: "Can't get all the bolgs!!!"});
    }
}

exports.getBlogById = async (req , res) => {
    try {
        const blogId = req.params.id;
        const result = await services.getBlogById(blogId);
        return res.status(200).json({data : result});
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: "Can't get blogs by Id!!!"});
    }
}