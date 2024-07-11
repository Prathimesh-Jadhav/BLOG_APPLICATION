const mongoose = require('mongoose');
const crypto = require('crypto');
const { error } = require('console');
const userSchema = mongoose.Schema({
    FullName:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
    },
    Salt:{
        type:String
    },
    ProfileImage:{
        type:String,
        default:'../public/avatar.jpeg'
    },
    role: {
        type:String,
        enum:['Normal','Admin'],
        default:'Normal'
    }
},{
    timestamps:true
})

userSchema.pre("save",function (next){
    const user = this;

    if(!user.isModified('Password')) return;

    const salt = crypto.randomBytes(16).toString();
    const hash = crypto.createHmac('sha256',salt).update(user.Password).digest('hex');
    
    this.Salt=salt;
    this.Password=hash;
    next();
})

userSchema.static('match_password',async function (userEmail,userPassword){
      const user = await this.findOne({Email:userEmail});
      
      if(!user) throw new error('User not found');
       
      const userSalt = user.Salt;
      const userpassword = user.Password;
      

      const hashedPassword = crypto.createHmac('sha256',userSalt).update(userPassword).digest('hex');

      if(userpassword!==hashedPassword) throw new Error('Incorrect password');

      return user;

})

const userModel = mongoose.model('user',userSchema)

module.exports=userModel