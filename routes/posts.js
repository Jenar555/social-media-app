const express=require("express")
const router=express.Router()

const { createPostController,likePostController,dislikePostController } = require("../controllers/postController")

//CREATE POST
router.post("/create",createPostController)

//LIKE POST 
router.post("/like/:postId",likePostController)

//DISLIKE POST
router.post("/dislike/:postId",dislikePostController)

module.exports=router