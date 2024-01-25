const express = require("express");
const router = express.Router();

//userRoutes
const controller = require("../controller/user");

router.post("/user/addComment/:id/:id",controller.addComment);
router.put("/user/addLike/:blogId",controller.like);
router.put("/user/deleteLike/:blogId/:userId",controller.unLike);
router.get("/user/searchBar/:q",controller.search);
router.get("/user/getCommentsById/:blogId",controller.getCommentsById);

module.exports = router;