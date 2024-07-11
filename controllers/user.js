const blogModel = require('../models/blog');
const userModel = require('../models/user');
const {generateToken}=require('../services/auth')

async function handleSignUp(req,res){
    const blogs = await blogModel.find({})
    try{
    const {userName,userEmail,userPassword}=req.body;
    
    
        const user = await userModel.create({
            FullName:userName,
            Email:userEmail,
            Password:userPassword
        })
       const token = generateToken(user);
       if(token) return res.cookie('token',token).render('home',{
        loggedin:user,
        blogs:blogs
       })
    }
    catch{
        return res.render('signup',{
        loggedin:req.user,
        blogs:blogs,
        error:"Please Give All Inputs"
        })
    }
    
}

async function handleSignIn(req,res){
    try{
        const {userEmail,userPassword}=req.body;
        const user= await userModel.match_password(userEmail,userPassword)
        const blogs = await blogModel.find({})
        const token = generateToken(user);
        if(token){
            return res.cookie('token',token).render('home',{
                loggedin:user,
                blogs:blogs
            })
        } 
        return res.cookie('token',token).render('home')
    }
    catch{
        return res.render('signin',{
            error:'Incorrect Email or Password'
        })
    }
    
}

module.exports={handleSignUp,handleSignIn}