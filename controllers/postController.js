const Post=require("../models/Post")
const User=require("../models/User")
const {CustomError}=require("../middlewares/error")

const createPostController=async(req,res,next)=>{
    const {userId,caption}=req.body
    try{
       
       const user=await User.findById(userId)
       if(!user){
        throw new CustomError("User not found!",404)
       }
       const newPost=new Post({
        user:userId,
        caption
       })

       await newPost.save()
       user.posts.push(newPost._id)
       await user.save()
       res.status(201).json({message:"Post created successfully!",post:newPost})
    }
    catch(error){
        next(error)
    }

}

const likePostController=async(req,res,next)=>{
    const {postId}=req.params
    const {userId}=req.body
    try{
        const post=await Post.findById(postId)
        if(!post){
            throw new CustomError("Post not found!",404)
        }
        const user=await User.findById(userId)
        if(!user){
            throw new CustomError("User not found!",404)
        }
        if(post.likes.includes(userId)){
            throw new CustomError("You have already liked this post!",404)
        }
        post.likes.push(userId)
        await post.save()
        res.status(200).json({message:"Post liked successfully!",post})
    }
    catch(error){
        next(error)
    }
}

const dislikePostController=async(req,res,next)=>{
    const {postId}=req.params
    const {userId}=req.body
    try{
        const post=await Post.findById(postId)
        if(!post){
            throw new CustomError("Post not found!",404)
        }
        const user=await User.findById(userId)
        if(!user){
            throw new CustomError("User not found!",404)
        }
        if(!post.likes.includes(userId)){
            throw new CustomError("You have not liked the post!",404)
        }
        
        post.likes=post.likes.filter(id=>id.toString()!==userId)
        await post.save()
        res.status(200).json({message:"Post disliked successfully!",post})
    }
    catch(error){
        next(error)
    }
}

module.exports={createPostController,
    likePostController,dislikePostController}