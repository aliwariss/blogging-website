const services = require("../services/user");

exports.addComment = async (req , res) => {
    try {
        const blogId = req.params.id;
        const userId = req.params.id;
        const payload = {
            blogId: blogId,
            userId: userId,
            commentBody: req.body.commentBody,
            date: new Date()
        };
        const result = await services.addComment(payload);
        return res.status(200).json({data  : result});
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: "Can't add comment!!!"});
    }
}

exports.like = async (req , res) => {
    try {
        const blogId = req.params.blogId;
        const userId = req.params.userId;
        const payload = {
            blogId,
            userId,
            userId: req.body.userId 
        }
        console.log(payload) 
        console.log("blogId in controller:", blogId);
        const result = await services.likeservices(payload);
        return res.status(200).json({data : result});
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: "Can't like the blog!!!"});
    }
 }

exports.unLike = async (req , res) => {
    try {
        const blogId = req.params.blogId;
        const userId = req.params.userId;
        const payload = {
            blogId,
            userId,
        }
        const result = await services.unLike(payload);
        return res.status(200).json({data : result});
    } catch (error) {
        return res.status(400).json({error: "Can't Unlike the blog!!!"});
    }
 }
 