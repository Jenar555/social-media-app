const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true
    },

    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }], // Initialize as empty array
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
},{timestamps:true})

const User=mongoose.model("User",userSchema)

module.exports=User