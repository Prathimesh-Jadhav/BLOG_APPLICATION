const {handleSignUp,handleSignIn} = require('../controllers/user')
const express = require('express');
const router = express.Router();

router.get('/signup',(req,res)=>{
    res.render('signup',{
    });
})

router.get('/signin',(req,res)=>{
    res.render('signin');
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token',{
        httpOnly:true,
        path:'/'
    }).redirect('/user/signin')
})

router.post('/signup',handleSignUp);

router.post('/signin',handleSignIn)

module.exports=router;

