const postModel = require('../models/posts-model');
const userModel = require('../models/user-model');

const createPost = async (req,res)=>{
    try {
        const {content} = req.body;
        // content ko required:true kiya hai schema me
        const {userId}  = req.user;
        // if user is logged in req.user will hold username and userId bcz of token verification
        
        const newPost = await postModel.create({
            userId,
            content
        });
    
        await userModel.findOneAndUpdate({_id:userId},{
            $push:{
                posts:newPost._id
            }
        })
        return res.json({msg:'Post created successfully',newPost});
    } catch (error) {
        return res.status(500).json({msg:'Error during creating post',error:error.message});
    }
}

const readPost = async (req,res)=>{
    try {
        const userId = req.params.id;
        
        const posts = await userModel.findById(userId).populate({
            path:'posts',
            select:'content -_id'
        }).select('posts -_id');

        if(!posts) return res.status(404).json({msg:"invalid user id"});
        // posts = {posts:[...array of posts]}

        return res.json({posts:posts.posts});
        
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

module.exports = {createPost,readPost};