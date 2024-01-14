const  express = require("express");
const router = express.Router();

const controller = require("../controller/auth");

router.post("/signUp",controller.signUp);
router.get("/signIn",controller.signIn);

module.exports = router;