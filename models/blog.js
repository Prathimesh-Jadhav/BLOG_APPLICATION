const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    coverImage:{
        type:String
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
},{
    timestamps:true
})

const blogModel = mongoose.model('blog',blogSchema);

module.exports=blogModel;