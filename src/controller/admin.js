const services = require("../services/admin");
const multer = require('multer');

var storage = multer.diskStorage({
 destination: function (req, file, cb) {
    cb(null, 'uploads')
 },
 filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
 }
})

var upload = multer({ storage: storage });

exports.addBlog = async (req , res) => {
    try {
        upload.fields([{ name: 'images' },{ name: 'thumbnail' }])(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({error: err.message});
            } else if (err) {
                return res.status(400).json({error: err.message});
            }
            
            const payload = {
                title: req.body.title,
                description: req.body.description,
                images: req.files['images'][0].path,
                thumbnail: req.files['thumbnail'][0].path,
                tags: req.body.tags,
                category: req.body.category,
                slug: req.body.category
            }
            const result = await services.addBlog(payload);
            res.status(200).json({data : result});
        });
    } catch (error) {
        console.error(error)
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
        console.error(error)
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

exports.getAllBlogs = async (req , res) => {
    try {
        const pageNumber = req.params.p || 1;
        const pageSize = 4;
        const result = await services.getAllBlogs(pageNumber , pageSize);
        // console.log(result)
        return res.status(200).json({data : result});
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: "Can't get all the bolgs!!!"});
    }
}

exports.getBlogById = async (req , res) => {
    try {
        const blogId = req.params.id;
        const result = await services.getBlogById(blogId);
        return res.status(200).json({data : result});
    } catch (error) {
        console.error(error)
        return res.status(400).json({error: "Can't get blogs by Id!!!"});
    }
}