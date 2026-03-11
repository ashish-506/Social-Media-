const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    content:{
        type: String,
        trim: true,
        required:[true,'Write something to post'],
        maxLength: [2000, "Post cannot exceed 2000 characters"]
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }],
    comments:[{
        userid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        text:{
            type: String, 
            required: [true,'comment content is empty'],
            trim: true
        },
    }]
},{
    timestamps: true
});

module.exports = mongoose.model('posts',postSchema);