const express = require("express");
const router = express.Router();

const controller = require("../controller/admin");
const { verifyAdmin } = require("../middlewares/authentication");

//AdminRoutes
router.post("/admin/addBlog",verifyAdmin, controller.addBlog);
router.put("/admin/updateBlog/:id",verifyAdmin, controller.updateBlog);
router.delete("/admin/deleteBlog/:id",verifyAdmin, controller.deleteBlog);
router.get("/admin/getAllBlogs",controller.getAllBlogs);
router.get("/admin/getBlogById/:id",controller.getBlogById);

module.exports = router;