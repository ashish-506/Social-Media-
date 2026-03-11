const mongoose = require('mongoose');

const connectionSchema = mongoose.Schema({
    requester:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    recipient:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    status:{
        type: String,
        enum: {
            values:['pending','accepted','rejected'],
            message:'{VALUE} is not supported'
        },
        default:'pending'
    }
})
connectionSchema.index({ requester: 1, recipient: 1 }, { unique: true });

module.exports = mongoose.model('connections',connectionSchema);