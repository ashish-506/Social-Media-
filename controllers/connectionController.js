const connectionModel = require('../models/connection-model');
const connectModel = require('../models/connection-model');

const sendRequest = async (req ,res)=>{
    try {
        const requester = req.user.userId;
        const recipient = req.params.id;
        if (requester === recipient) return res.status(400).json({msg: "Cannot follow yourself"});

        let connection = await connectModel.findOne({
            requester,
            recipient,
        });

        if(connection){
            if(connection.status === 'pending') return res.status(409).json({msg:'request has already been send'});
            if(connection.status === 'rejected'){
                connection.status = 'pending';
                await connection.save();
                return res.status(200).json({msg:'request has been sent'});
            }
            if (connection.status === 'accepted') return res.status(400).json({msg:'You already follow them'});
        }

        await connectModel.create({
            requester,
            recipient,
        })
        return res.status(200).json({msg:'request has been sent'});

    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

const acceptedRequest = async (req, res)=>{
    try {
        const recipient = req.user.userId;
        const requester = req.params.id;

        const connection = await connectModel.findOne({requester,recipient,status:'pending'});
        if(!connection) return res.status(404).json({msg:'user not found'});

        connection.status = 'accepted';
        await connection.save();
        return res.status(200).json({msg:'requested accepted'});

    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}
const rejectRequest = async (req,res)=>{
    try {
        const recipient = req.user.userId;
        const requester = req.params.id;

        const connection = await connectModel.findOne({requester,recipient,status:'pending'});
        if(!connection) return res.status(404).json({msg:'user not found'});

        connection.status = 'rejected';
        await connection.save();
        return res.status(200).json({msg:'request rejected'});

    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

const withdrawRequest = async (req,res)=>{
    try {
        const requester = req.user.userId;
        const recipient = req.params.id;

        const connection = await connectModel.findOne({
            requester,
            recipient,
            status:'pending'
        });

        if(!connection) return res.status(400).json("invalid request");

        await connectModel.findByIdAndDelete(connection._id);
        return res.status(200).json({msg:'request has been withdrawn'});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

const removeFollower = async (req,res)=>{
    try {
        const recipient = req.user.userId;
        const requester = req.params.id;

        const connection = await connectModel.findOne({
            requester,
            recipient,
            status:'accepted'
        });

        if(!connection) return res.status(400).json({msg:'invalid request'});

        await connectionModel.findByIdAndDelete(connection._id);
        return res.status(200).json({msg:'follower removed'});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

const unfollow = async (req,res)=>{
    try {
        const requester = req.user.userId;
        const recipient = req.params.id;

        const connection = await connectModel.findOne({
            requester,
            recipient,
            status:'accepted'
        });

        if(!connection) return res.status(400).json({msg:'invalid request'});

        await connectionModel.findByIdAndDelete(connection._id);
        return res.status(200).json({msg:'unfollowed'});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

const myFollowers = async (req,res)=>{
    try {
        const recipient = req.user.userId;
        
        const followers = await connectModel.find({recipient,status:'accepted'}).populate({path:'requester',select:'username -_id'}).select('requester -_id');
        return res.status(200).json({followers});
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

const myfollowing = async (req,res)=>{
    try {
        const requester = req.user.userId;
        const followers = await connectModel.find({requester,status:'accepted'}).populate({path:'recipient',select:'username -_id'}).select('recipient -_id');
        return res.status(200).json({followers});
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}
module.exports = {sendRequest,acceptedRequest,rejectRequest,withdrawRequest,removeFollower,unfollow,myFollowers,myfollowing};