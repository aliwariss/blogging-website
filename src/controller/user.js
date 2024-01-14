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
        const blogId = req.params.id;
        const userId = req.params.id;
        const payload = {
            blogId,
            userId
        } 
        const result = await services.like(payload);
        return res.status(200).json({data : result});
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: "Can't like the blog!!!"});
    }
 }
 