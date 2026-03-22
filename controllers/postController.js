const { isObjectIdOrHexString } = require('mongoose');
const postModel = require('../models/posts-model');
const userModel = require('../models/user-model');
const connectModel = require('../models/connection-model');

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

const likeHandler = async (req,res)=>{
    try {
        const postId = req.params.id;
        const {userId} = req.user;

        const post = await postModel.findById(postId);
        if(!post) return res.status(404).json({msg:"post not found"});
        
        if(post.likes.includes(userId)) post.likes.pull(userId);
        else post.likes.push(userId);

        await post.save();

        return res.status(200).json({post});

    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
    
}
const commentHandler = async (req,res)=>{
    try {
        const postId = req.params.id;
        const {userId} = req.user;
        const {text} = req.body;

        if (!text || text.trim() === "") {
            return res.status(400).json({ msg: "Comment text is required" });
        }

        const newComment = await postModel.findByIdAndUpdate(
            postId,
            { 
                $push:{
                    comments: { userId, text: text }
                } 
            },
            { returnDocument: 'after' } // ye {new:true} ka replacement hai, isse newComment me after update wali value aaegi, agr purani value chahiye to returnDocument:'before' krna hoga

        )
        return res.status(200).json({msg:"success",comment:newComment});

    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}
const getExplore = async (req,res)=>{
    try {
        const posts = (await postModel.find()
            .sort({ _id: -1 })
            .limit(50)
            .populate({
                path:'userId',
                select:'username -_id'
            }).select('content userId')).map(cont=>{ 
                return {
                    postId:cont._id,
                    username:cont.userId?.username || "Unknown User",
                    content:cont.content
                }});
        
        return res.status(200).json({posts});
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

const getPersonalFeed = async (req,res)=>{
    try {
        const myId = req.user.userId;

        const connections = await connectModel.find({
            status: 'accepted',
            requester:myId
        });

        const friendIds = connections.map(conn => {
            return conn.recipient;
        });
        friendIds.push(myId);

        const posts = (await postModel.find({ 
            userId: { $in: friendIds } 
        })
        .sort({ _id: -1 }) // Fastest time-based sorting
        .limit(100)
        .populate({
            path:'userId',
            select:'username -_id'
        }).select('content userId'))
            .map(cont=>{
                return {
                    postId:cont._id,
                    username:cont.userId?.username || "Unknown User",
                    content:cont.content}
            });

        return res.status(200).json({ posts });
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}
module.exports = {
    createPost,
    readPost,
    likeHandler,
    commentHandler,
    getExplore,
    getPersonalFeed
};