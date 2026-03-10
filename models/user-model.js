const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:true,
        trim:true,
        minlength:[1,"username can't be empty"],
        maxlength:[15,"max length is 15"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        select:false
    },
    email:{
        type:String,
        required:[true,"email is required"],
        trim:true,
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"enter a valid email"]
    },
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'posts'
        },
    ],
    friends:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    }],
    requests:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    }]
});

userSchema.pre('save', async function(){
    if(!this.isModified('password')){
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    
})
module.exports = mongoose.model('users',userSchema);