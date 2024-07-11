const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    blogid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blogs'
    }
});

const commentModel = mongoose.model('comments',commentSchema);

module.exports=commentModel;

