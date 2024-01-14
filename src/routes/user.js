const express = require("express");
const router = express.Router();

//userRoutes
const controller = require("../controller/user");

router.post("/user/addComment/:id/:id",controller.addComment);
router.put("/user/addLike/:id/:id",controller.like);

module.exports = router;