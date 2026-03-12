const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req,res)=>{

    const {username,password,email} = req.body;
    try {
        const newUser = await userModel.create({
            username,
            password,
            email
        })

        const token = jwt.sign({username,userId:newUser._id},process.env.JWT_KEY,{expiresIn:"1hr"});
        res.cookie('token',token,{ maxAge: 3600000, httpOnly: true });
        
        return res.status(200).json({ msg: "user created successfully", data: newUser });
    } catch (err) {
        console.dir(err, { depth: null });
        return res.json(({msg:err}));
    }
}

const loginUser = async (req,res)=>{
    const user = req.body;
    
    try {
        let validUser;

        // user will either enter his email or username
        if(!user.password) return res.json({msg:"password is required"});

        if(user.email){
            validUser = await userModel.findOne({email:user.email}).select("+password");
        }else if(user.username){
            validUser = await userModel.findOne({username:user.username}).select("+password");
        }else{
            return res.json({msg:"please enter username/email"});
        }
        
        if(!validUser) return res.status(404).json({msg:'invalid credentials'});
        
        user.username = validUser.username;
        const match = await bcrypt.compare(user.password,validUser.password);

        if(match){
            const token = jwt.sign({username: user.username,userId:validUser._id},process.env.JWT_KEY,{expiresIn:"1hr"});
            res.cookie('token',token,{ maxAge: 3600000, httpOnly: true });
            res.json({msg:"success"});
        }
        else return res.status(404).json({msg:"invalid credentials"});
    } catch (error) {
        return res.status(500).json({msg:error});
    }


    
}

module.exports = {registerUser,loginUser};