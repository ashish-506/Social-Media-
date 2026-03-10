const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    content:{
        type: String,
        trim: true,
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
            required: true,
            trim: true
        },
    }]
},{
    timestamps: true
});

module.exports = mongoose.model('posts',postSchema);