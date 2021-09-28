const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const likeCtrl = require("../controllers/Likes");
const likeCommentsCtrl = require("../controllers/LikesComments");


router.post("/", auth, likeCtrl.addlike);
router.post("/comment", auth, likeCommentsCtrl.addlikeComment);


// router.delete("/:id", auth, likeCtrl.unLike);



module.exports = router;